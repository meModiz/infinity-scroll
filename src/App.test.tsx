/**
 * @vitest-environment jsdom
 */
import App from "./App.tsx";
import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

// https://vitest.dev/guide/mocking.html#globals
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

test("Initial photo batch test", async () => {
  render(<App />);

  // Wait for images to fetch
  const images = await vi.waitUntil(() => screen.findAllByTestId("gallery_image"));

  // Expect initial batch to have 9 images
  expect(images.length).toBe(9);
});

test("Favouriting item test", async () => {
  render(<App />);

  // Wait for images to fetch
  const images = await vi.waitUntil(() => screen.findAllByTestId("gallery_image"));

  // Expect initial batch to have 9 images
  expect(images.length).toBe(9);

  // Expect 9 "favourite" buttons (9 images)
  const btn = screen.getAllByText("Favourite");
  expect(btn.length).toBe(9);

  let clickedBtns: number = 0;
  // Loop through buttons array
  for (var index in btn) {
    // Randomizer for button clicks
    // Generates number: 1 and 2, if number == 1 then click the button
    if (Math.floor(Math.random() * 2) == 1) {
      clickedBtns += 1;
      fireEvent(
        btn[index],
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }

  //Expect "favourite" buttons by formula: 9(initial buttons) - clicked buttons
  expect(screen.getAllByText("Favourite").length).toBe(9 - clickedBtns);

  //Expect "favourite" buttons by formula: clicked buttons
  expect(screen.getAllByText("Unfavourite").length).toBe(clickedBtns);

  //Expect that everything saves to localstorage
  const localstrg = localStorage.getItem("favouriteImages") || null;
  if (localstrg) expect(JSON.parse(localstrg).length).toBe(clickedBtns);
});
