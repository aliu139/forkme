
This is a repository with my , those that in Linux/OS X normally are these files under the `$HOME` directory that are hidden and preceded by a dot, AKA **dotfiles**.

## Overview

The primary goal is to increase CLI productivity on OS X, though many scripts run just fine on any POSIX implementation and it is easy to build environment again by running just the [installation command](#oneliner) of one-liner.

My primary OS is OS X (10.10.x) and some of these configurations are tuned to work on that platform. The bash files are more generic and friendly toward other Unix-based operating systems.


## Features

- **OS X** Yosemite (MacBook, Retina 12-inch, Early 2015)
- **Terminal.app** (Full-screen)
- **Solarized** ([base 16](https://github.com/chriskempson/base16))
- **Tmux** 1.9a
- **Zsh** 5.0.5
- **Vim** (7.4 Huge +clipboard +lua)

***DEMO:***

[![](https://raw.githubusercontent.com/b4b4r07/screenshots/master/dotfiles/demo_retina.png)][dotfiles]

**Note:** You can clone or fork them freely, but I don't guarantee that they fit you.


## Installation

The easiest way to install this dotfiles is to open up a terminal, type the installation command below:
Run the following command to set up a new machine:


- It is almost the same as the command below except for executing through a Web site directly.


	It is not necessary to perform `make install` at all if this repository was installed by the [installation command](#oneliner).

- General download method using the `git` command:

	
	Incidentally, `make install` will perform the following tasks.
	

**What's inside?**

1. Download this repository
2. Deploy (i.e. *copy* or *create symlink*) dot files to your home directory; `make deploy`
3. Run all programs for setup in `./etc/init/` directory; `make init` (**Optional**: when running the [installation command](#oneliner) specify `-s init` as an argument)

When the [installation command](#oneliner) format is not `curl -L URL | sh` but `sh -c "$(curl -L URL)"`, shell will be restart automatically. If this is not the case, it is necessary to restart your shell manually.

***DEMO:***


### Quick installation


To quickly install:


Difference of *Installation* and *Quick Installation* is that the latter one-liner is shorter than the former one (including typing the number of shift key). However, because when you install in the *Quick installation* shell is not re-boot, it is necessary to perform the `exec sh` yourself.


Actually notation of the shell may be `sh` instead of `bash`. Regardless of the `sh` realities, it is possible to do the same installation process because the [script file](etc/install) that is used to the [installation command](#oneliner) is a shell script that conforms to POSIX.

**Note:** If you want to use the [`curl`](http://curl.haxx.se), in order to follow the redirect `-L` flag is essential. On the other hand, it is possible to omit `-s` flag because it is meant that silent or quiet mode makes `curl` mute.


## Updating

To update later on, just run this command.


In addition, there are several git submodules included in this configuration. On a new installation these submodules need to be initialized and updated.


## Setup

### Initialize

All configuration files for setup is stored within the `etc/init/` directory. By running the command below, you can interactively setup all preferences.


To run `make init` immediately after running the [installation command](#oneliner):


**Init scripts**

- Build and install customized Vim (+clipboard, +lua)
- Globalize your home directory name
- Install antigen the zsh plugin manager
- Install pygments the generic syntax highlighter written in python
- Install Homebrew the missing package manager for OS X
- Install the CLI tool that comes with Xcode
- Run 'brew install' based on the Brewfile
- Sensible OS X defaults
- Setup Karabiner (formerly KeyRemap4MacBook)
- ...

For more information about initializing, see also [./etc/README.md](./etc/README.md).

### Vim

To install the Vim plugins, run this command.


Vim plugins are not installed from you just running the [installation command](#oneliner). To install the plugins, you must specify the `-c 'NeoBundleInit'` as an argument when starting Vim. By doing so, install immediately [neobundle.vim](https://github.com/Shougo/neobundle.vim) and other plugins (**requires**: `git` in `$PATH`, Vim 7.2+, a lot of time, Wi-Fi). 

To use these plugins effectively, features of Vim needs **normal or [more](http://www.drchip.org/astronaut/vim/vimfeat.html)**.

### Git

Make the configuration file for personal use. Copy and paste the following to personal configuration file, e.g. `~/.sh.local`


# Set the credentials (modifies ~/.gitconfig)

### Zsh

The easiest way to change your shell is to use the `chsh` command. You can also give `chsh` the `-s` option; this will set your shell for you, without requiring you to enter an editor.


**Note:** The shell that you wish to use must be present in the `/etc/shells` file.

### OS X

When setting up a new Mac, you may want to perform the following tasks mainly.

- Install the Xcode Command Line Tools

	You need to have Xcode or, at the very minimum, the Xcode Command Line Tools, which are available as a much smaller download.
	
	The easiest way to install the [Xcode Command Line Tools](https://developer.apple.com/downloads) in OS X 10.9+ is to open up a terminal, type `xcode-select --install` and follow the prompts.

- Install Homebrew and setup their formulae

	Since OS X does not have a native package manager that you can use from the command line, [Brew](http://brew.sh) (also known as Homebrew), has filled in. 
	
	After installing Homebrew, you may want to install some common Homebrew formulae:
	
	
- Run some `defaults` commands

	It can set many hidden settings and preferences in Mac OS X, and in individual applications.

All of these are included in the `make init` for OS X. For more detail, see also [here][platform] of documentation of OS X operation.


## Trial

If you have [Vagrant]and [Virtualbox] already installed, this is both faster and cleaner than downloading and compiling all the dependencies in OS X. To install, simply do the following:


If you want to try my dotfiles without polluting your development environment, it would be best to use a Vagrant. Have fun by setting and please remove it after finish.

## Structure



## Credits

Acknowledgment; I established this dotfiles referring to the following user's repositories. Thus, I would appreciate it if you used my repository for reference. Thanks.




Copyright (c) 2014 "BABAROT" b4b4r07

Licensed under the [MIT license].

Unless attributed otherwise, everything is under the MIT licence. Some stuff is not from me, and without attribution, and I no longer remember where I got it from. I apologize for that.

