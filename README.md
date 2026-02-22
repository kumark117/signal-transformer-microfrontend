# Signal Transformer MicroFE - POC

Complete Micro-Frontend POC using React 18, TypeScript, and Webpack 5 Module Federation.

## Architecture

- **Container (Host)**: Port 3000 - Hosts the main app and consumes remote component
- **Remote App**: Port 3001 - Exposes `SignalTransformer` component via Module Federation

## Project Structure

```
UI-React-Typescript-MicroFrontEnd/
├── container/
│   ├── src/
│   │   ├── index.tsx          # React root entry
│   │   └── App.tsx            # Host app component
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── webpack.config.js      # Webpack + Module Federation config
│   ├── tsconfig.json          # TypeScript config
│   └── package.json
│
└── remote/
    ├── src/
    │   ├── index.tsx                    # Remote root entry
    │   └── SignalTransformer.tsx        # Component to expose
    ├── public/
    │   └── index.html                   # HTML template
    ├── webpack.config.js                # Webpack + Module Federation config
    ├── tsconfig.json                    # TypeScript config
    └── package.json
```

## Setup & Run Instructions

### 1. Install Container Dependencies

```bash
cd container
npm install
```

### 2. Install Remote Dependencies

```bash
cd ../remote
npm install
```

### 3. Start Both Apps (in separate terminals)

**Terminal 1 - Start Remote App (Port 3001):**
```bash
cd remote
npm start
```

**Terminal 2 - Start Container App (Port 3000):**
```bash
cd container
npm start
```

### 4. Open in Browser

Navigate to: `http://localhost:3000`

## How It Works

### Container (Host) - Port 3000
- **State**: `multiplier` (default: 5), `finalResult` 
- **Lazy loads** remote `SignalTransformer` component using `React.lazy()`
- **Passes props**:
  - `multiplier: number` - Current multiplier value
  - `onResult: (value: number) => void` - Callback when transformation completes
- **Displays**:
  - Current multiplier value
  - Remote component in a centered card
  - Final result section

### Remote App - Port 3001
- **Accepts props**:
  - `multiplier: number` - Used to calculate result
  - `onResult: (value: number) => void` - Called with computed value
- **Local state**: `inputValue` (number input)
- **Renders**:
  - Number input field
  - "Transform" button (works with Enter key too)
- **On button click**:
  - Computes: `inputValue × multiplier`
  - Calls `onResult(result)`

## Visual Flow

```
Container App (Port 3000)
├── Multiplier Section: Shows value = 5
├── Remote Component (loaded from Port 3001)
│   └── Input + Transform Button
├── Result Section: Displays final result
```

## Example Usage

1. Container loads with `multiplier = 5`
2. User enters `10` in the remote component's input field
3. User clicks "Transform" button
4. Remote calculates: `10 × 5 = 50`
5. Remote calls `onResult(50)`
6. Container updates `finalResult` to `50` and displays it

## Module Federation Configuration

**Container** (`webpack.config.js`):
```javascript
remotes: {
  remote: 'remote@http://localhost:3001/remoteEntry.js'
}
shared: {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true }
}
```

**Remote** (`webpack.config.js`):
```javascript
exposes: {
  './SignalTransformer': './src/SignalTransformer.tsx'
}
shared: {
  react: { singleton: true },
  'react-dom': { singleton: true }
}
```

## Key Features

- ✅ React 18 with TypeScript strict mode
- ✅ Webpack 5 Module Federation with proper shared dependencies
- ✅ React.lazy() for code splitting
- ✅ Proper bootstrap pattern for initialization
- ✅ Props-based communication (no Redux)
- ✅ Minimal CSS with clean styling
- ✅ Production-ready structure
- ✅ Cross-origin enabled (CORS headers)

## Troubleshooting

**Port already in use?**
- Change port in `devServer.port` in webpack.config.js

**Remote not loading?**
- Ensure remote app is running on port 3001
- Check browser console for CORS or network errors
- Verify `remoteEntry.js` is accessible at `http://localhost:3001/remoteEntry.js`

**TypeScript errors?**
- Ensure `npm install` completed successfully in both directories
- All dependencies should match between container and remote

## Build for Production

```bash
# Container
cd container
npm run build

# Remote
cd remote
npm run build
```

Output will be in `dist/` folders of each app.
