import * as React from 'react';
import * as _ from "lodash";
import axios from 'axios';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';

const useStyles = makeStyles({
    gridContainer: {
        marginTop: 50
    },
    streamInfoContainer: {
        marginLeft: 50
    },
    chatContainer: {
        marginRight: 50
    },
    thumbnail: {
        marginTop: 15,
        width: '100%'
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
    },
    statContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    countMargin: {
        marginLeft: 15
    },
    chat: {
        maxHeight: '80%',
        overflow: 'auto',
        marginLeft: 50,
        marginTop: 25
    },
    message: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    user: {
        fontWeight: 'bold'
    },
    offline: {
        marginTop: '25%'
    }
});

type Chat = {
    time: string;
    user: string;
    message: string;
};

export const Dashboard: React.FunctionComponent<{}> = () => {
    const classes = useStyles();

    const [title, setTitle] = React.useState<string>('');
    const [viewerCount, setViewerCount] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<string>('');
    const [thumbnail, setThumbnail] = React.useState<string>('');
    const [chat, setChat] = React.useState<Chat[]>([]);
    const [isOnline, setIsOnline] = React.useState<boolean>(false);

    // Connect to the Twitch channel's chat
    (async () => {
        const clientId = '0qmxdyuchkdcpkfktmq2t47z06eng1';
        const clientSecret = '7b00yip56b78z0kiwt9bvduia5oinn';

        let response = await axios.get('https://tungsten.alexlogan.co.uk/user/b0960c68-af68-4e5b-8447-1150878998c1/');
        const tokenData = JSON.parse(response.data.tokens);

        // Use automatically-refreshed tokens for the connection
        const twitchClient = TwitchClient.withCredentials(clientId, tokenData.twitch.chat.accessToken, undefined, {
            clientSecret,
            refreshToken: tokenData.twitch.chat.refreshToken,
            expiry: tokenData.twitch.chat.expiryTimestamp === null ? null : new Date(tokenData.twitch.chat.expiryTimestamp),
            onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
                const newTokenData = {
                    accessToken,
                    refreshToken,
                    expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
                };
                tokenData.twitch.chat = newTokenData;
                await axios.put('https://tungsten.alexlogan.co.uk/user/b0960c68-af68-4e5b-8447-1150878998c1/', {'tokens': JSON.stringify(tokenData)});
            }
        });

        // Get channel name
        let user: string = '';
        response = await axios.get('https://api.twitch.tv/helix/users', { headers: {"Authorization" : `Bearer ${tokenData.twitch.authentication}`}});
        if (response.data.data) {
            user = response.data.data[0].login;
        }
    
        const chatClient = await ChatClient.forTwitchClient(twitchClient, {channels: [user]});
        await chatClient.connect();
    
        // Subscribe to the new message event
        chatClient.onPrivmsg((channel, user, message) => {
            const newChat: Chat[] = chat;
            const time: string = `${moment().hour()}:${moment().minute()}`;
            if (newChat.length === 0 || (newChat.length > 0 && !_.isEqual(newChat[newChat.length - 1], {time: time, user: user, message: message}))) {
                newChat.push({time: time, user: user, message: message});
                setChat([...newChat]);
            }
        });
    })();

    const fetchStreamData = (stream: string) => {
        // Get stream related information
        axios.get(`https://api.twitch.tv/helix/streams?user_login=${stream}`, {headers: {'Client-ID': '0qmxdyuchkdcpkfktmq2t47z06eng1'}}).then(response => {
            const data = response.data.data[0];

            // Check if stream is online
            if (data) {
                setIsOnline(true);
                const diff = moment.duration(moment().diff(moment(data.started_at)));
            
                if (diff.hours() === 0) {
                    setDuration(diff.minutes() + 'm');
                } else {
                    setDuration(diff.hours() + 'h:' + diff.minutes() + 'm');
                }
                
                setTitle(data.title);
                setThumbnail(data.thumbnail_url.replace('{width}x{height}', '1920x1080'));
                setViewerCount(data.viewer_count);
            } else {
                setIsOnline(false);
            }
        });
    };

    React.useEffect(() => {
        // Get the OAuth token of the logged in account
        axios.get('https://tungsten.alexlogan.co.uk/user/b0960c68-af68-4e5b-8447-1150878998c1/').then(response => {
            const tokenData = JSON.parse(response.data.tokens);

            axios.get('https://api.twitch.tv/helix/users', { headers: {"Authorization" : `Bearer ${tokenData.twitch.authentication}`}}).then(response => {
                if (response.data.data) {
                    const stream: string = response.data.data[0].login;

                    // Update statistics every minute
                    fetchStreamData(stream);    
                    const interval = setInterval(() => {
                        fetchStreamData(stream);
                    }, 60000);
                    return () => clearInterval(interval);
                }
            });
        });
    }, []);

    return (
        <React.Fragment>
            <Typography variant='h3' align='center'>
                Stream Information
            </Typography>
            {isOnline &&
                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs className={classes.streamInfoContainer}>
                        <Typography variant="h4" align="center">
                            {title}
                        </Typography> 
                        <img className={classes.thumbnail} src={thumbnail} alt="Stream Thumbnail"/> 
                        <div className={classes.infoContainer}>
                            <div className={classes.statContainer}> 
                                <PeopleIcon fontSize='large'/>
                                <Typography className={classes.countMargin}>
                                    {viewerCount}
                                </Typography>
                            </div>   
                            <div className={classes.statContainer}>
                                <TimelapseIcon fontSize='large'/>
                                <Typography className={classes.countMargin}>
                                    {duration}
                                </Typography>  
                            </div>  
                        </div>                 
                    </Grid>
                    <Grid item xs className={classes.chatContainer}>
                        <Typography variant="h4" align="center">
                            Chat
                        </Typography>
                        <div className={classes.chat}>
                            {chat.reverse().map((el, idx) => (
                                <div key={idx} className={classes.message}>
                                    <Typography className={classes.user}>
                                    [{el.time}] {el.user}:
                                    </Typography>
                                    <Typography>
                                        {el.message}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            }
            {!isOnline &&
                <Typography className={classes.offline} variant='h4' align='center'>
                    Stream is currently offline
                </Typography>
            }
        </React.Fragment>
    );
}