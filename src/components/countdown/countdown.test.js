import React from 'react';
import { Button } from '../components';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CountDown} from './../countdown/countdown';
configure({adapter: new Adapter()});

describe('<countdown />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow( <CountDown
            status={{
                name: "",
                asaltos: 1,
                descanso: 60,
                combate: 240,
                get_ready:0,
                sounds_preaviso:5,
                sounds_asalto:0,
                sounds_descanso:4,
                sounds_fincombate:1,
                
            }}
          ></CountDown>);
    });

    it('should render one button', () => {
        wrapper = shallow( <CountDown
            status={{
                name: "",
                asaltos: 1,
                descanso: 60,
                combate: 240,
                get_ready:0,
                sounds_preaviso:5,
                sounds_asalto:0,
                sounds_descanso:4,
                sounds_fincombate:1,
                
            }}
          ></CountDown>);
        expect(wrapper.find(Button)).toHaveLength(1);
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