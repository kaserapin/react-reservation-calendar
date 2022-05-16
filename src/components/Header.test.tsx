import TestRenderer from "react-test-renderer";
import Header from "./Header";

it('should display "Select reservation date"', () => {
    const component = TestRenderer.create(<Header />);

    const props = component.root.findByType("h1").props;

    expect(props.children).toStrictEqual("Select reservation date");
});