import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { AuthProvider } from './context/authContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from './context/settingContext'

createRoot(document.getElementById('root')!).render(
  	<StrictMode>
		<Router>
			<SettingsProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</SettingsProvider>
		</Router>
	</StrictMode>
)
