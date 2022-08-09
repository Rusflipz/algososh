import { Button } from "./button";
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from "@testing-library/react"

const buttonText = "text"

describe("Проверка кнопки", () => {

    it("Проверка кнопки с текстом", () => {
        const snap = renderer.create(<Button text="test text" />).toJSON()
        expect(snap).toMatchSnapshot()
    });

    it("Проверка кнопки без текстом", () => {
        const snap = renderer.create(<Button />).toJSON()
        expect(snap).toMatchSnapshot()
    });


    it("Проврка неактивной кнопки", () => {
        const snap = renderer.create(<Button disabled={true} />).toJSON()
        expect(snap).toMatchSnapshot()
    });

    it("Проврка кнопкиr загрузки", () => {
        const snap = renderer.create(<Button isLoader={true} />).toJSON()
        expect(snap).toMatchSnapshot()
    });

    it("Проверка клика", () => {
        const fn = jest.fn()
        render(<Button text={buttonText} onClick={fn} />)
        const button = screen.getByText(buttonText)
        fireEvent.click(button)
    });

})
