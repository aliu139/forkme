GitHub Changelog Generator ![GitHub Logo]

### Changelog generation has never been so easy

**Fully automate changelog generation** - This gem generates change log file based on **tags**, **issues** and merged **pull requests** (and splits them into separate lists according to labels) from :octocat: GitHub Issue Tracker.

Since now you don't have to fill your `CHANGELOG.md` manually: just run the script, relax and take a cup of :coffee: before your next release! :tada:

### *What’s the point of a change log?*
To make it easier for users and contributors to see precisely what notable changes have been made between each release (or version) of the project.
### *Why should I care?*
Because software tools are for people. If you don’t care, why are you contributing to open source? Surely, there must be a kernel (ha!) of care somewhere in that lovely little brain of yours.


## Installation


See also Troubleshooting.

## Output example



- In general, it looks like this:



 **Implemented enhancements:**


## Usage
**It's really simple!**

- If your **`git remote`** `origin` refers to your GitHub repo, just go to your project folder and run:

		github_changelog_generator

-  Or, run this from anywhere:
    - `github_changelog_generator -u github_username -p github_project`
    - `github_changelog_generator  github_username/github_project`

- If you are running it against a repository on a Github Enterprise install, you must specify *both* `--github-site` and `--github-api` command line options:

        github_changelog_generator --github-site="https://github.yoursite.com" \
                                   --github-api="https://github.yoursite.com/api/v3/"

This generates a changelog to the `CHANGELOG.md` file, with pretty markdown formatting.

### Params
Type `github_changelog_generator --help` for details.

For more details about params, read the Wiki page: [**Advanced change log generation examples**]
### Params File
In your project root, you can put a params file named `.github_changelog_generator` to override default params:

### GitHub token

GitHub only allows only 50 unauthenticated requests per hour. 
Therefore, it's recommended to run this script with authentication by using a **token**.

Here's how:

- Either:
    - Run the script with `--token <your-40-digit-token`; **OR**
    - Set the `CHANGELOG_GITHUB_TOKEN` environment variable to your 40 digit token

You can set an environment variable by running the following command at the prompt, or by adding it to your shell profile (e.g., `~/.bash_profile` or `~/.zshrc`):

        export CHANGELOG_GITHUB_TOKEN="«your-40-digit-github-token»"

So, if you got an error like this:
! /Library/Ruby/Gems/2.0.0/gems/github_api-0.12.2/lib/github_api/response/raise_error.rb:14:in `on_complete'

It's time to create this token! (Or, wait an hour for GitHub to reset your unauthenticated request limit.)

## Migrating from a manual changelog

Knowing how dedicated you are to your project, you probably haven't been waiting for `github-changelog-generator` to keep a changelog.
But you probably don't want your project's open issues and PRs for all past features listed in your historic changelog, either.

That's where `--base <your-manual-changelog.md` comes in handy!
This option lets append your old manual changelog to the end of the generated entries.

If you have a `HISTORY.md` file in your project, it will automatically be picked as the static historical changelog and appended.

### Rake task

You love `rake`? We do, too! So, we've made it even easier for you: 
we've provided a `rake` task library for your changelog generation.

Just put something like this in your `Rakefile`:

All command line options can be passed to the `rake` task as `config` parameters. And since you're naming the `rake` task yourself, you can create as many as you want.


## Features and advantages of this project
- Generate canonical, neat change log file, followed by [basic change log guidelines](http://keepachangelog.com) :gem:
- Optionally generate **Unreleased** changes (closed issues that have not released yet) :dizzy:
- **GitHub Enterprise support** via command line options! :factory:
- Flexible format **customization**:
    - **Customize** issues that **should be added** to changelog :eight_spoked_asterisk:
    - **Custom date formats** supported (but keep [ISO 8601](http://xkcd.com/1179/) in mind!) :date:
    - Manually specify the version that fixed an issue (for cases when the issue's Closed date doesn't match) by giving the issue's `milestone` the same name as the tag of version :pushpin:
    - Automatically **exclude specific issues** that are irrelevant to your changelog (by default, any issue labeled `question`, `duplicate`, `invalid`, or `wontfix`) :scissors:
- **Distinguish** issues **by labels**. :mag_right:
    - Merged pull requests (all merged pull-requests) :twisted_rightwards_arrows:
    - Bug fixes (issues labeled `bug`) :beetle:
    - Enhancements (issues labeled `enhancement`) :star2:
    - Issues (closed issues with no labels) :non-potable_water:

- Manually include or exclude issues by labels :wrench:
- Customize lots more! Tweak the changelog to fit your preferences :tophat:
(*See `github_changelog_generator --help`  for details)*


###Alternatives
Here is a [wikipage list of alternatives] that I found. But none satisfied my requirements.

*If you know other projects, feel free to edit this Wiki page!*


### Projects using this library
Here's a [wikipage list of projects](https://github.com/skywinder/Github-Changelog-Generator/wiki/Projects-using-Github-Changelog-Generator).

If you've used this project in a live app, please let me know! Nothing makes me happier than seeing someone else take my work and go wild with it.


## Am I missing some essential feature?

- **Nothing is impossible!**


- *Bug reports, feature requests, patches, and well-wishes are always welcome.* :heavy_exclamation_mark:

## FAQ

- ***I already use GitHub Releases. Why do I need this?***

GitHub Releases is a very good thing. And it's very good practice to maintain it. (Not a lot of people are using it yet!) :congratulations:

*BTW: I would like to support GitHub Releases in [next releases](https://github.com/skywinder/github-changelog-generator/issues/56) ;)*

I'm not trying to compare the quality of handwritten and auto-generated logs. That said....

An auto-generated changelog really helps, even if you manually fill in the release notes!

For example:

When I found a closed bug, it's very useful know which release fixed it. 
In this case, you can easily find the issue by \# in `CHANGELOG.md`.

- it's not quite as easy to find this in handwritten releases notes
- a generated file saves you the trouble of remembering everything;
  sometimes people forget to add things to a handwritten file

Ultimately, I think GitHub Releases is ideal for end-users. 
Meanwhile, `CHANGELOG.md` lives right in the repository, with its detailed list of changes, which is handy for developers.
Finally, there's nothing wrong with using GitHub Releases alongside `CHANGELOG.md` in this combination.

- ***I received a warning: "GitHub API rate limit exceed"  What does this mean?***

GitHub [limits the number of API requests] you can make in an hour. You can make up to 5,000 requests per hour. For unauthenticated requests, the rate limit is only up to 60 requests per hour. Unauthenticated requests are associated with your IP address (not the user making requests).

If you're seeing this warning, please do the following:

1. Make sure you're providing an OAuth token, so you're not making requests anonymously. Using an OAuth token increases your hourly request maximum from 60 to 5000.
2. If you have a large repo with lots of issues/PRs, you can use `--max-issues NUM` to limit the number of issues that are pulled back. For example: `--max-issues 1000`

- ***My Ruby version is very old, can I use this?***

When your Ruby is old, and you don't want to upgrade, and you want to
control which libraries you use, you can use Bundler.

In a Gemfile, perhaps in a non-deployed `:development` group, add this
gem:


Then you can keep back dependencies like rack, which currently is only
compatible with Ruby = 2.2.2. So, use an older version for your app by
adding a line like this to the Gemfile:


This way, you can keep on using github_changelog_generator, even if you
can't get the latest version of Ruby installed.

## Contributing

1. Create an issue and describe your idea
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
7. Profit! :white_check_mark:

*To test your workflow with changelog generator, you can use [test repo](https://github.com/skywinder/changelog_test/)*

## License

