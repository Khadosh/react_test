import Enzyme from 'enzyme';
import EnzymeAddapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAddapter()
});