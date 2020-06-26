import React from 'react';
import { Button } from '../components';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavLink } from 'react-router-dom';
import {Navigator} from '../navigator/navigator';
configure({adapter: new Adapter()});

describe('<Navigator />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow( <Navigator/>);
    });

    it('should have 4 NavLinks', () => {
        expect(wrapper.find(NavLink)).toHaveLength(4);
    });

    /*it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });*/
/*
    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<div class="combate counter "><div class="view_round">1</div><div class="layer" style="height: 29vh;"></div><div class="component-button"><span class="number">1:26</span>II <br/></div></div>
        
        
        
        )).toEqual(true);
    });*/
});