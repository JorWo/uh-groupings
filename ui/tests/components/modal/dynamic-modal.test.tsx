import { fireEvent, render, screen } from '@testing-library/react';
import DynamicModal from '@/components/modal/dynamic-modal';
import Link from 'next/link';

describe('DynamicModal', () => {
    it('should open an informational modal with test contents and no extra buttons', () => {
        render(<DynamicModal open={true} title="A Dynamic Title" body="Some dynamic message here." />);
        fireEvent.focus(document);

        expect(screen.getByRole('alertdialog', { name: 'A Dynamic Title' })).toBeInTheDocument();
        expect(screen.getByRole('alertdialog')).toHaveTextContent('Some dynamic message here.');

        expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    });

    it('should open an informational modal with test contents and extra buttons', () => {
        render(
            <DynamicModal
                open={true}
                title="A Dynamic Title"
                body="Some dynamic message here."
                buttons={[<>Button1</>, <>Button2</>]}
            />
        );
        fireEvent.focus(document);

        expect(screen.getByRole('alertdialog', { name: 'A Dynamic Title' })).toBeInTheDocument();
        expect(screen.getByRole('alertdialog')).toHaveTextContent('Some dynamic message here.');

        expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Button1' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Button2' })).toBeInTheDocument();
    });

    it('should close the modal upon clicking the OK button', () => {
        render(<DynamicModal open={true} title="A Dynamic Title" body="Some dynamic message here." buttons={[]} />);
        fireEvent.focus(document);

        expect(screen.getByRole('alertdialog', { name: 'A Dynamic Title' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'A Dynamic Title' })).toBeInTheDocument();
        expect(screen.getByRole('alertdialog')).toHaveTextContent('Some dynamic message here.');

        expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'OK' }));
        expect(screen.queryByRole('alertdialog', { name: 'A Dynamic Title' })).not.toBeInTheDocument();
    });

    it('should close the modal and route to the provided link (Feedback)', () => {
        render(
            <DynamicModal
                open={true}
                title="A Modal to the Feedback Page"
                body="Click Feedback to go to the Feedback Page."
                buttons={[
                    <Link key={'feedbackButton'} href={'/feedback'}>
                        Feedback
                    </Link>
                ]}
            />
        );
        fireEvent.focus(document);

        expect(screen.getByRole('alertdialog', { name: 'A Modal to the Feedback Page' })).toBeInTheDocument();
        expect(screen.getByRole('alertdialog')).toHaveTextContent('Click Feedback to go to the Feedback Page.');

        expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Feedback' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Feedback' })).toHaveAttribute('href', '/feedback');

        fireEvent.click(screen.getByRole('button', { name: 'Feedback' }));
        expect(screen.queryByRole('alertdialog', { name: 'A Modal to the Feedback Page' })).not.toBeInTheDocument();
    });
});