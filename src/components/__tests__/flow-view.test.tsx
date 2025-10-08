import { describe, expect, it } from "vitest";
import { render } from '@testing-library/react';
import FlowView from "../flow-view";


describe('FlowView Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<FlowView />);
    expect(container).toBeInTheDocument();
  });
});