# Vention Salary Calculator

## Required tools

To run the project correctly you will need to have installed **make** and **yarn**.

#### Installing Yarn

The most recommended way to install **yarn** is through npm package manager. To do so, run:

```
npm install --global yarn
```

Then check if **yarn** is installed by running:

```
yarn --version
```

Alternative ways of installation **yarn** are available [here](https://classic.yarnpkg.com/lang/en/docs/install/).

#### Installing Make on Windows

The most common way to have **make** available on Windows is by using [Chocolatey](https://chocolatey.org/install).

To check if you have **Chocolatey** already installed run:

```
choco --version
```

To install **Chocolatey** use the [instructions](https://chocolatey.org/install#install-step2) on the official website.

Once the installation was successful run:

```
choco install make
```

> Note that restart of system or IDE may be required.

#### Installing Make on Mac

**Make** can be installed using **Homebrew** package manager.

```
brew install gcc
brew install make
```

#### Installing Make on Linux

**Make** command comes preinstalled in most Linux distros. If **make** command cannot be found try running:

```
sudo apt-get update
sudo apt-get install -y make
```

In case it didn't work try running:

```
sudo apt-get update
sudo apt install build-essential
```

## Getting started

Clone the repository:

```
git clone git@github.com:MadaShindeInai/salaryCalc.git
```

Navigate to the project and create a new branch:

```
cd ./salaryCalc && git checkout -b branch-name
```

Being in project root directory install dependencies:

```
yarn
```

To start the application run:

```
make d
```

To build production version of the application run:

```
make b
```

### Upgrading all packages in interactive mode

```
yarn upgrade-interactive
```
