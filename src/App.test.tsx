import React from 'react'
import { shallow } from 'enzyme';
import WordAnalyzerApp from './WordAnalyzerApp';

describe('<WordAnalyzerApp />', () => {
  let component

  beforeEach(() => {
    component = shallow(<WordAnalyzerApp />)
  })
  test('It should mount', () => {
    expect(component.length).toBe(1)
  })
});