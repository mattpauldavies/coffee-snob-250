import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('<App />', () => {
  it('renders the route title and headline stats', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'coffee-snob-250' }),
    ).toBeInTheDocument()

    const stats = screen.getByText('Distance').closest('.stats')
    expect(stats).not.toBeNull()
    expect(within(stats as HTMLElement).getByText('250 mi')).toBeInTheDocument()
  })

  it('shows details for the selected stop and updates on selection', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Start stop is selected by default.
    expect(
      screen.getByRole('heading', { level: 2, name: 'Harbor Roasters' }),
    ).toBeInTheDocument()

    const list = screen.getByRole('region', { name: 'Coffee stops' })
    await user.click(
      within(list).getByRole('button', { name: /Summit & Steam/ }),
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Summit & Steam' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Single-origin pour over')).toBeInTheDocument()
  })
})
