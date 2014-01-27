---
layout: page
title: Semantic Suite
intro: A semantic style testing suite for JavaScript.
tags: ['testing']
pageOrder: 2
---

Why make yet another testing suite?
-----------------------------------

Good point... why bother? There are some great testing suites out there already and there might not be much difference. The only difference we're proposing is less code and a more readable interface.

Let's take the old "calculator" example. I'll first write these examples in CoffeeScript as it makes Semantic Suite look even better.

Here's the example using the Jasmine testing suite:

      describe "Calculator", ->

        calculator = null

        beforeEach ->
          calculator = new Calculator()

        describe ".add()", ->

          beforeEach ->
            calculator.left = 50
            calculator.right = 70
            calculator.add()

          it "will sum the 2 numbers", ->
            expect(calculator.total).toBe 120 

Here's the same example using Semantic Suite:

      {expect} = require "chai"

      "Calculator".features ->
        "Adding".scenario ->
          Given "calculator", -> new Calculator()
          When -> calculator().left = 50
          And  -> calculator().right = 70
          And  -> calculator().add()
          Then -> expect(calculator().total).to.be 120

If you've used any testing wuite with "Gherkin" syntax, or used something like "RSpec" you may notice some influence.

Here's the same example written in plain JavaScript. It's not quite as nice, but it still seems pretty readable:

Jasmine:

      describe("Calculator", function () {
        var calculator = null;

        beforeEach(function () {
          calculator = new Calculator();
        });

        describe(".add()", function () {

          beforeEach(function () {
            calculator.left = 50;
            calculator.right = 70;
            calculator.add();
          });

          it("will sum the 2 numbers", function () {
            expect(calculator.total).toBe(120);
          });

        });
      });

Semantic Suite:

      {expect} = require "chai"

      "Calculator".features(function(){
        "Adding".scenario(function(){
          Given("calculator", function(){ return new Calculator(); });
          When(function(){ calculator().left = 50; });
          And(function(){ calculator().right = 70; });
          And(function(){ calculator().add(); });
          Then(function(){ expect(calculator().total).to.be(120); });
        });
      });

Installation
------------

1. Install Node.js
2. `sudo npm i -g semantic-suite`

Using
-----

`sems my-test-file.coffee`

