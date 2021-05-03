import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

const testTitle = 'Test title';
const testDescription = 'Test description';

test('it renders', () => {
    render(<Header title={testTitle} description={testDescription}/>);
    const titleElement = screen.getByText(testTitle);
    const descriptionElement = screen.getByText(testDescription);
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
});