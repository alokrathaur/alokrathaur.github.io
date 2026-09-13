# Known Issues — LegendPrix AI Web App

## ISSUE-001: WebGL Fallback on Low-End Devices
- **Description**: Devices with disabled hardware acceleration may render a blank canvas in the hero.
- **Severity**: Low.
- **Workaround**: Canvas gracefully renders starry CSS gradient fallback when WebGL context fails.
- **Status**: FIXED
