import React from 'react';
import axios from 'axios';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { Settings } from '../components/Settings';
import { defaultOverlay } from '../components/OverlayAttributes';
import { ListItem } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

describe('<SettingsTests />', () => {

  it('should render correctly', () => {
    const wrapper = mount(<Settings />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display list of saved templates', async () => {
    var mock = new MockAdapter(axios);
    const data = [{ 
        url: 'https://tungsten.alexlogan.co.uk/overlays/id', 
        name: 'TestTemplate', 
        overlays: [defaultOverlay] 
    }];
    mock.onGet('https://tungsten.alexlogan.co.uk/overlays/').reply(200, data);
    
    const wrapper = mount(<Settings />);
    await act(async () => {
        wrapper.update();
    });
    expect(wrapper.find(FormControlLabel)).toHaveLength(2);
  });
});