import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import * as serviceWorker from './serviceWorker'
import 'react-dropzone-uploader/dist/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'react-phone-input-2/lib/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

Sentry.init({
  dsn: "https://e0d25a47eabf40598447239438e529af@o19148.ingest.sentry.io/5796448",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// rg4js('apiKey', '71pSno4MdPm3xJPkPP7fGA');
// rg4js('enablePulse', true);
// rg4js('enableCrashReporting', true);

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
