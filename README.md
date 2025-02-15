# MJLSP_2025

1. Install Node.js
    - Windows:
        - https://nodejs.org/en
        - Make sure to install `npm` too
        - Check if you have them installed with `node -v` and `npm -v`
        - If `npm -v` doesn't work, try doing: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` on Windows
    - MacOs:
        - /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        - brew install node
        - Check if you have them installed with `node -v` and `npm -v`

3. Startup Website
    - cd mjlsp
    - npm start
    - If react-scripts is not recognized. Try `npm install react-scripts`
