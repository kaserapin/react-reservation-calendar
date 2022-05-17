import TestRenderer from "react-test-renderer";
import ControlPanel from "./ControlPanel";

describe('Control panel component', () => {
    const props = {
        onLeftArrowClick: jest.fn(),
        onRightArrowClick: jest.fn(),
        displayedMonth: "May",
        displayedYear: 2022
    }
    const controlPanel = TestRenderer.create(<ControlPanel {...props} />);

    const root = controlPanel.root;

    it('should have class "calendarControlPanel"', () => {
        const isClassNameCalendarControlPanel = root.findAllByType("div")[0].props.className.includes("calendarControlPanel");
        expect(isClassNameCalendarControlPanel).toBe(true);
    });

    it('should have "keyboard_arrow_left" icon name in leftArrow container', () => {
        const leftArrowContainer = root.findByProps({className: "arrowLeft"});
        const iconContainer = leftArrowContainer.props.children.props.children;

        expect(iconContainer.includes("keyboard_arrow_left")).toBe(true);
    });

    it('should have "keyboard_arrow_right" icon name in rightArrow container', () => {
        const rightArrowContainer = root.findByProps({className: "arrowRight"});
        const iconContainer = rightArrowContainer.props.children.props.children;

        expect(iconContainer.includes("keyboard_arrow_right")).toBe(true);
    });

    it('should call props.onLeftArrowClick when the left arrow is clicked', () => {
        const leftArrowButton = root.findByProps({className: "arrowLeft"});

        leftArrowButton.props.children.props.onClick();

        expect(props.onLeftArrowClick.mock.calls.length).toBe(1);
    });

    it('should call props.onRightArrowClick when the right arrow is clicked', () => {
        const rightArrowButton = root.findByProps({className: "arrowRight"});

        rightArrowButton.props.children.props.onClick();

        expect(props.onRightArrowClick.mock.calls.length).toBe(1);
    });
});