import { useState } from 'react'

const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

function generatePassword(length, useUpper, useLower, useNumber, useSymbol) {
  let chars = ''
  if (useUpper) chars += upperChars
  if (useLower) chars += lowerChars
  if (useNumber) chars += numbers
  if (useSymbol) chars += symbols
  if (!chars) return ''

  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

function checkStrength(pwd) {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  switch (score) {
    case 5:
      return 'Very Strong'
    case 4:
      return 'Strong'
    case 3:
      return 'Medium'
    case 2:
      return 'Weak'
    default:
      return 'Very Weak'
  }
}

export default function App() {
  const [length, setLength] = useState(12)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumber, setUseNumber] = useState(true)
  const [useSymbol, setUseSymbol] = useState(false)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState('')

  const handleGenerate = () => {
    const pwd = generatePassword(length, useUpper, useLower, useNumber, useSymbol)
    setPassword(pwd)
    setStrength(checkStrength(pwd))
  }

  return (
    <div className="container">
      <h1>Password Generator & Checker</h1>

      <label>
        Length: {length}
        <input
          type="range"
          min="6"
          max="64"
          value={length}
          onChange={e => setLength(Number(e.target.value))}
        />
      </label>

      <div className="checkboxes">
        <label><input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Uppercase (A-Z)</label>
        <label><input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> Lowercase (a-z)</label>
        <label><input type="checkbox" checked={useNumber} onChange={e => setUseNumber(e.target.checked)} /> Numbers (0-9)</label>
        <label><input type="checkbox" checked={useSymbol} onChange={e => setUseSymbol(e.target.checked)} /> Symbols (!@#$%)</label>
      </div>

      <button onClick={handleGenerate}>Generate Password</button>

      {password && (
        <>
          <textarea readOnly rows={3} value={password} />
          <div className={`strength strength-${strength.replace(' ', '').toLowerCase()}`}>Strength: {strength}</div>
        </>
      )}
    </div>
  )
}
