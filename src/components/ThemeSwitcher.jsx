import React, { useEffect, useState } from 'react'
import styles from './ThemeSwitcher.module.css'
import {FaSwatchbook, FaMoon, FaSun} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import useLocalStorage from '../hooks/useLocalStorage'


const ThemeSwitcher = () => {

    const [hue, setHue] = useLocalStorage('react-todo.color', '240')
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useLocalStorage('react-todo-theme', defaultDark ? 'dark' : 'light')
    const [isColorPicker, setIsColorPicker] = useState(false)

    useEffect(() => {
        document.documentElement.setAttribute('color-scheme', theme)
    }, [theme])

    useEffect(() => {
        document.documentElement.style.setProperty('--_hue', hue)
    }, [hue])

  return (
    <aside className={styles.wrapper}
    style={{
        backgroundColor: isColorPicker ? 
        'hsl(var(--muted) / .6)' : 'transparent'
    }}>
        {isColorPicker ? (
            <>
                <button
                    className={`btn ${styles.close}`}
                    aria-label='Close color picking mode'
                    onClick={() => setIsColorPicker(false)}>
                    <AiOutlineClose />
                </button>
                <input 
                    className={styles.picker}
                    type="range"
                    min="0"
                    max="360"
                    aria-label='Change color theme slider'
                    value={hue}
                    onInput={(e)=>setHue(e.target.value)} />
            </>
        ) : (
            <div className={styles.btns}>
                <button 
                    className='btn' 
                    role='switch'
                    onClick={()=>setTheme(theme === 'light' ? 'dark': 'light')}
                    aria-label={`Change theme to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <button 
                    className='btn'
                    onClick={() => setIsColorPicker(true)}
                    aria-label='Enable color picking mode'>
                    <FaSwatchbook />
                </button>
            </div>
        )}
    </aside>
  )
}

export default ThemeSwitcher
