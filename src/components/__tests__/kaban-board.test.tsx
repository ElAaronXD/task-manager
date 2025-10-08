import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';
import KabanBoard from "../kaban-board";


describe('KabanBoard Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<KabanBoard />);
    expect(container).toBeInTheDocument();
  });

  it('renders all columns from mock data', () => {
    render(<KabanBoard />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('does not render DragOverlay by default', () => {
    render(<KabanBoard />);
    expect(screen.queryByTestId('drag-overlay')).not.toBeInTheDocument();
  });
});

