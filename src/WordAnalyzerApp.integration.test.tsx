import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WordAnalyzerApp from './WordAnalyzerApp';

const mockFetch = jest.fn();

const enterTextAndAnalyze = async (text: string) => {
  const textInput = await screen.findByLabelText(/fill in your text/i);
  const analyzeButton = screen.getByRole('button', { name: /analyze/i });

  fireEvent.change(textInput, { target: { value: text } });
  expect(analyzeButton).toBeEnabled();
  fireEvent.click(analyzeButton);

  await screen.findByRole('button', { name: /start again/i });
};

describe('<WordAnalyzerApp /> user flow', () => {
  afterEach(() => {
    delete process.env.REACT_APP_PIXABAY_API_KEY;
  });

  beforeEach(() => {
    process.env.REACT_APP_PIXABAY_API_KEY = 'test-key';
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          hits: [{ previewURL: 'https://example.test/word.jpg' }],
        }),
      }),
    );
    window.fetch = mockFetch as any;
  });

  test('moves from text entry through result interactions and back to an empty form', async () => {
    render(<WordAnalyzerApp />);

    const analyzeButton = await screen.findByRole('button', { name: /analyze/i });
    expect(analyzeButton).toBeDisabled();

    await enterTextAndAnalyze('apple apple pear');

    const appleResult = screen
      .getAllByRole('button')
      .find((button) => button.textContent?.includes('apple'));

    expect(appleResult).toBeDefined();
    fireEvent.click(appleResult as HTMLElement);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(document.querySelectorAll('.YourHighlightClass').length).toBeGreaterThan(0);

    const frequencyInput = document.getElementById('frecuencyWordTextField') as HTMLInputElement;
    expect(frequencyInput).toBeInTheDocument();

    fireEvent.change(frequencyInput, { target: { value: 'pear' } });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    expect(await screen.findByAltText('pear')).toBeInTheDocument();

    fireEvent.change(frequencyInput, { target: { value: 'apple' } });
    fireEvent.keyDown(frequencyInput, { key: 'Enter', code: 'Enter' });
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(3));
    expect(await screen.findByAltText('apple')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start again/i }));

    const emptyTextInput = await screen.findByLabelText(/fill in your text/i);
    expect(emptyTextInput).toHaveValue('');
    expect(screen.getByRole('button', { name: /analyze/i })).toBeDisabled();
  });

  test('keeps empty inputs on stable reject paths without requesting an image', async () => {
    render(<WordAnalyzerApp />);

    const textInput = await screen.findByLabelText(/fill in your text/i);
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });

    fireEvent.change(textInput, { target: { value: '   ' } });
    expect(analyzeButton).toBeDisabled();

    await enterTextAndAnalyze('apple');

    const frequencyInput = document.getElementById('frecuencyWordTextField') as HTMLInputElement;
    fireEvent.change(frequencyInput, { target: { value: '123 !' } });

    expect(frequencyInput).toHaveValue('');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => expect(mockFetch).not.toHaveBeenCalled());
    expect(screen.getByRole('button', { name: /start again/i })).toBeInTheDocument();
  });

  test('clamps the number of top words before calculating the result list', async () => {
    render(<WordAnalyzerApp />);

    await enterTextAndAnalyze('apple apple pear');

    const topWordsInput = screen.getByLabelText(/number of top words/i);

    fireEvent.change(topWordsInput, { target: { value: '1000' } });
    expect(topWordsInput).toHaveValue(100);

    fireEvent.change(topWordsInput, { target: { value: '0' } });
    expect(topWordsInput).toHaveValue(1);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test('keeps a calculated result usable when the image service finds no image', async () => {
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ hits: [] }),
      }),
    );
    render(<WordAnalyzerApp />);

    await enterTextAndAnalyze('apple apple pear');

    const frequencyInput = screen.getByLabelText(/word to find/i);
    fireEvent.change(frequencyInput, { target: { value: 'apple' } });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('APPLE')).toBeInTheDocument();
    expect(screen.queryByAltText('apple')).not.toBeInTheDocument();
  });

  test('keeps a calculated result usable when the image request fails', async () => {
    mockFetch.mockImplementation(() => Promise.reject(new Error('network down')));
    render(<WordAnalyzerApp />);

    await enterTextAndAnalyze('apple apple pear');

    const frequencyInput = screen.getByLabelText(/word to find/i);
    fireEvent.change(frequencyInput, { target: { value: 'apple' } });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText('APPLE')).toBeInTheDocument();
    expect(screen.queryByAltText('apple')).not.toBeInTheDocument();
  });

  test('calculates a result without requesting an image when no API key is configured', async () => {
    delete process.env.REACT_APP_PIXABAY_API_KEY;
    render(<WordAnalyzerApp />);

    await enterTextAndAnalyze('apple apple pear');

    const frequencyInput = screen.getByLabelText(/word to find/i);
    fireEvent.change(frequencyInput, { target: { value: 'apple' } });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(await screen.findByText('APPLE')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
    expect(screen.queryByAltText('apple')).not.toBeInTheDocument();
  });

  test('exposes coherent landmarks, headings, and accessible control names', async () => {
    render(<WordAnalyzerApp />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: /the wordanalyzer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /see what stands out/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/fill in your text/i)).toHaveAttribute('aria-describedby', 'word-counter');

    await enterTextAndAnalyze('apple apple pear');

    expect(screen.getByRole('heading', { level: 2, name: /your word profile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /analyzed text/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /top words/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /highest frequency/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /frequency calculator/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /top words/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /highest frequency/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/number of top words/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/word to find/i)).toHaveAttribute('aria-describedby', 'frequency-description');
  });
});
