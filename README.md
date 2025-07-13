# BoozeOrNo
------

Don't kill yourself drinking!
Always wanted to know if it is safe to drink while on medication or not?
This is your web application. It could be.
. 
This is our Student Project for the 6th semester of Health informatics.

-------

In order to make it work with your own codespaces, just create codespace on main. 
After the containers are finished spinning up, there must be two ports forwarded: 3000 and 8000.
Click on the link for port 3000 and the website shows in a new tab/window, according to your browser settings

------------

To see the web application in live action, on a publicy available website (PRODUCTION ENVIRONMENT), visit: https://boozeorno-frontend.onrender.com/ (make sure you also visit https://boozeorno-backend.onrender.com/ to trigger the backend from its sleep as well! They are working in different containers, modularly, so we need to wake up both. once a blue frame and some json response is visible, you can close the backend page! )
It may take a while spinning up because we're on the free plan and therefore only use 0.1 CPU. Also, after a certain time of inactivity, it spins down and needs to be manually woken up.

-----

To deploy the web application yourself at a website like render, just use the HTTPS URL and take the "Release" branch for deployment.
This may only work for render since we're using render.yaml file to configure the containers on render; for different pages please tweak the .yaml file according to your wishes. If needed, i can provide a blueprint for render, just ask!


