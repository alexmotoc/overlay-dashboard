import React from 'react';
import { mount } from 'enzyme';
import { OverlayBuilder } from '../components/OverlayBuilder';
import { OverlayPreview } from '../components/OverlayPreview';
import { Tab, IconButton } from '@material-ui/core';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/overlays/"
    })
}));

describe('<OverlaySlider />', () => {

  it('should render correctly', () => {
    const wrapper = mount(<OverlayBuilder />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display box with 100% width and 100% height', () => {
    const wrapper = mount(<OverlayBuilder />);
    const height = wrapper.find('input').at(2);
    const width = wrapper.find('input').at(4);

    height.simulate('change', { target: { value: '100' } });
    width.simulate('change', { target: { value: '100' } });
    
    const attributes = wrapper.find(OverlayPreview).props();
    expect(attributes.size.height).toEqual(100);
    expect(attributes.size.width).toEqual(100);
  });

  it('should display two overlay tabs', () => {
    const wrapper = mount(<OverlayBuilder />);
    const newButton = wrapper.find(IconButton);
    expect(wrapper.find(Tab)).toHaveLength(1);

    newButton.simulate('click');

    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find(Tab).at(1).props().label).toEqual('Overlay1');
  });
});