
# OHCE by @jmtorralvo & @jmanzano

# How to generate executable and run it

You have just to run

```
npm install -g pkg
yarn bundle
./ohce-christmas-macos Torralvo
```

Anyways three different versions have been created and are available in the root of the project and are ready to use:

```
ohce-christmas-linux
ohce-christmas-macos
ohce-christmas-win.exe
```

# Kata statement

**ohce** is a console application that echoes the reverse of what you input through the console.

Even though it seems a silly application, **ohce** knows a thing or two.

When you start oche, it greets you differently depending on the current time, but only in Spanish:

1. Between 20 and 6 hours, **ohce** will greet you saying: ¡Buenas noches < your name >!

2. Between 6 and 12 hours, **ohce** will greet you saying: ¡Buenos días < your name >!

3. Between 12 and 20 hours, **ohce** will greet you saying: ¡Buenas tardes < your name >!

When you introduce a palindrome, **ohce** likes it and after reverse-echoing it, it adds ¡Bonita palabra!

**ohce** knows when to stop, you just have to write Stop! and it'll answer Adios < your name > and end.

This is an example of using **ohce** during the morning:

```
$ **ohce** Pedro
> ¡Buenos días Pedro!
$ hola
> aloh
$ oto
> oto
> ¡Bonita palabra!
$ stop
> pots
$ Stop!
> Adios Pedro
```