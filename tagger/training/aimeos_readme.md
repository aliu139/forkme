
Aimeos TYPO3 extension

The repository contains the TYPO3 extension integrating the Aimeos e-commerce
library into TYPO3. The extension provides plugins for e.g. filter, list and
detail views, for searching products as well as baskets and the checkout process.


## Table of content


## Installation

### TYPO3 extension repository

If you want to install Aimeos into your existing TYPO3 installation, the [Aimeos extension from the TER](https://typo3.org/extensions/repository/view/aimeos) is recommended. You can download and install it directly from the Extension Manager of your TYPO3 instance.

For new TYPO3 installations, there's a 1-click [Aimeos distribution](https://typo3.org/extensions/repository/view/aimeos_dist) available too. Choose the Aimeos distribution from the list of available distributions in the Extension Manager and you will get a completely set up shop system including demo data for a quick start.

### Composer

The latest version can be installed via composer too. This is especially useful if you want to create new TYPO3 installations automatically or play with the latest code. You need to install the [composer](https://getcomposer.org/) package first if it isn't already available:
```
php -r "readfile('https://getcomposer.org/installer');" | php -- --filename=composer
```

In order to tell composer what it should install, you have to create a basic `composer.json` file in the directory of you VHost. It should look similar to this one:
It will install TYPO3 and the latest Aimeos TYPO3 extension in the `./htdocs/` directory. Afterwards, the Aimeos composer script will be executed which copies some required files and adds a link to the Aimeos extensions placed in the `./ext/` directory. To start installation, execute composer on the command line in the directory where your `composer.json` is stored:
```
composer update
```

## TYPO3 setup

### Extension

* Log into the TYPO3 back end
* Click on ''Admin Tools::Extension Manager'' in the left navigation
* Click the icon with the little plus sign left from the Aimeos list entry (looks like a lego brick)
* If a pop-up opens (only TYPO3 4.x) choose ''Make updates'' and "Close window" after the installation is done

**Caution:** Install the **RealURL extension before the Aimeos extension** to get nice looking URLs. Otherwise, RealURL doesn't rewrite the parameters even if you install RealURL afterwards!


### Database

Afterwards, you have to execute the update script of the extension to create the required database structure:


## Page setup

The page setup for an Aimeos web shop is easy if you import the  into your TYPO3 installation.

### Go to the import view

* In Web::Page, root page (the one with the globe)
* Right click on the globe
* Move the cursor to "Branch actions"
* In the sub-menu, click on "Import from .t3d"


### Upload the page tree file

* In the page import dialog
* Select the "Upload" tab (2nd one)
* Click on the "Select" dialog
* Choose the file you've downloaded
* Press the "Upload files" button


### Import the uploaded page tree file

* In Import / Export view
* Select the uploaded file from the drop-down menu
* Click on the "Preview" button
* The pages that will be imported are shown below
* Click on the "Import" button that has appeared
* Confirm to import the pages


Now you have a new page "Shop" in your page tree including all required sub-pages.

## License

The Aimeos TYPO3 extension is licensed under the terms of the GPL Open Source
license and is available for free.

## Links

