import { render, screen } from '@testing-library/react'
import GetStartedPanel from '../components/GetStartedPanel';

const testDescription = 'Test description';

test('it renders', () => {
    render(<GetStartedPanel description={testDescription} />);
    const getStartedElement = screen.getByText('Get started');
    const descriptionElement = screen.getByText(testDescription);
    expect(getStartedElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
});