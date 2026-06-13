import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToolPrefsProvider } from "./hooks/useToolPrefs";
import { routes } from "./routes";
import "./i18n";

afterEach(cleanup);

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <HelmetProvider>
      <ToolPrefsProvider>
        <RouterProvider router={router} />
      </ToolPrefsProvider>
    </HelmetProvider>,
  );
  return router;
}

describe("navegação entre ferramentas", () => {
  it("troca o conteúdo da ferramenta sem acumular o anterior", async () => {
    const router = renderAt("/lorem-ipsum");
    await waitFor(() => expect(screen.getByText(/📝/)).toBeDefined());

    await router.navigate("/conversor-cores");
    await waitFor(() => expect(screen.getByText(/🎨/)).toBeDefined());

    expect(screen.queryByText(/📝/)).toBeNull();
  });

  it("não acumula ao alternar várias vezes (ida e volta)", async () => {
    const router = renderAt("/lorem-ipsum");
    await waitFor(() => expect(screen.getByText(/📝/)).toBeDefined());

    await router.navigate("/conversor-cores");
    await waitFor(() => expect(screen.getByText(/🎨/)).toBeDefined());

    await router.navigate("/lorem-ipsum");
    await waitFor(() => expect(screen.getByText(/📝/)).toBeDefined());

    expect(screen.queryByText(/🎨/)).toBeNull();
    expect(screen.queryAllByText(/📝/)).toHaveLength(1);
  });
});
