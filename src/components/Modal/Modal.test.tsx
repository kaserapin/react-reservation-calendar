import TestRenderer, {ReactTestRendererJSON} from "react-test-renderer";
import Modal from "./Modal";

describe('Modal component', () => {
    const defaultProps = {
        isModalOpen: false,
        onCloseModalClick: jest.fn(),
        openedDay: 22,
        openedMonth: 4,
        openedMonthInWords: "May",
        openedYear: 2022,
        isLoading: false,
        reservations: []
    }

    it('should have class "opened" when modal is opened', () => {
        const modalComponent = TestRenderer.create(<Modal {...defaultProps} isModalOpen={true} />);
        const tree = modalComponent.toJSON() as ReactTestRendererJSON;
        const classNameOfModal = tree.props.className;
        expect(classNameOfModal.includes("opened")).toBe(true);
    });

    it('should not have class "opened" when modal is closed', () => {
        const modalComponent = TestRenderer.create(<Modal {...defaultProps} isModalOpen={false} />);
        const tree = modalComponent.toJSON() as ReactTestRendererJSON;
        const classNameOfModal = tree.props.className;
        expect(classNameOfModal.includes("opened")).toBe(false);
    });
    it('should call onCloseModalClick on closeButton click', () => {
        const modalComponent = TestRenderer.create(<Modal {...defaultProps} />)
        const root = modalComponent.root;

        const closeButton = root.findByProps({className: "closeButton"});
        closeButton.props.onClick();
        expect(defaultProps.onCloseModalClick).toHaveBeenCalledTimes(1);
    });
})