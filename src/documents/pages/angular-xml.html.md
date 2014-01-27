---
title: Angular XML
intro: XML module for Angular.JS
layout: page
tags: ['angular','xml']
pageOrder: 1
---

It provides 3 helpers:

1. A parser to turn an XML string in to a DOM object.
          function MyCtrl(xmlParser) {
            var domElement = xmlParser.parse('<blogs><blog name="my first blog" id="1"/></blogs>');
            console.log(domElement);
            // => #document
          }

2. A filter to convert an XML string in to an [Angular element](http://docs.angularjs.org/api/angular.element).
          function MyCtrl(xmlFilter) {
            var xml = xmlFilter('<blogs><blog name="my first blog" id="1"/></blogs>');
            console.log(xml.find('blog'));
            // => [blog#1]
          }

3. A HTTP interceptor to turn all you responses in to an [Angular element](http://docs.angularjs.org/api/angular.element).
          angular
            .module('blogs', ['xml'])
            .config(function ($httpProvider) {
              $httpProvider.responseInterceptors.push('xmlHttpInterceptor');
            })
            .controller('Blogs', function BlogsCtrl($scope, $http) {
              $scope.blogs = [];

              $http.get('blogs.xml').then(function (response) {
                var blogs = [],
                    els = response.xml.find('blog'),
                    blog,
                    i;

                for (i = 0; i < els.length; i += 1) {
                  blog = angular.element(els[i]);
                  blogs.push({
                    name: blog.attr('name'),
                    id: blog.attr('id')
                  });
                }

                $scope.blogs = blogs;
              });
            });

Installation
------------

There are 3 options:

1. Download the latest tag.
2. Use bower: `bower i --save angular-xml`
3. Or use jsDelivr CDN: //cdn.jsdelivr.net/angular.xml/0.1.3/angular-xml.min.js

