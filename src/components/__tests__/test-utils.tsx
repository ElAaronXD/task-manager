export const renderWithProviders = (ui, { providerProps, ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider {...providerProps}>
        {children}
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};