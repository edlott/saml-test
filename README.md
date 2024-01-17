# saml-test
This Node.js program let's you run a local web application that works with the samlbug tenant.
 The companion mock-saml project also works with this application.

## Prerequisites
You'll need a Node/npm environment on your computer to run this application.  The simplest way to
do this is to use nodenv (linux, macosx) or nvm-windows (windows).  This application was developed with
node 16.20.0.

## Installation/Running
To install/run, do the following:
* Clone the repository:  https://github.com/edlott/saml-test
* Switch to the samlbug branch
* Run the following in the root directory of this project:
```bash
npm install # Run this one time
npm run start # Run this every time you want to start the application.
```
If you want to login as a manual user, browse to http://localhost:3000.  If
you want to SSO into this application, run the mock-saml companion application
and perform a login - it will re-direct to this application and log you in.

The application is simple enough:
* When you go to a page requiring authentication, you initiate an okta-hosted login flow.
* While you're logged-in, you can go to the user-info page to see your token.
* This application uses the token-refresh pattern to guarantee that you have a valid token.
* The application logs you out when you attempt to refresh the token past the configured refresh window.
* There's a counter section at the bottom of the screen that shows you token-change activity (i.e. counting token-refreshes).
