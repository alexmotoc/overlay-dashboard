import React from 'react';
import { mount, shallow } from 'enzyme';
import { OverlayBuilder } from '../components/OverlayBuilder';
import { OverlayPreview } from '../components/OverlayPreview';

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
});