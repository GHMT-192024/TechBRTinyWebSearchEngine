Feature: Search Index
Scenario 1: Adding a new page
    Given an empty search Index
    When I add a page with URL "htpps://www.example.com" and content "This is a sample web page about dogs" Then the search index index should contain the keyword "dogs" associated with the URL "htpps://www.example.com"
 
Scenario 2: Updating a page
    Given a search index containing the keyword "dogs" associated with the 
    "https://www.example.com" When I update the page with URL "https://www.example.com" to have content "This is a sample web page about cats" 
    Then the search index should no longer conatin the keyword "dogs" associated with the URL "https://www.example.com"
       And the search index should contain the keyword "cats" associated with URL "https://www.example.com"

Scenario 3: Removing a page
    Given a search index conataining the keyword "cats" associated with the "https://www.example.com" When I remove the page with URL "https://www.example.com" 
    Then the search index should no longer conatin the keyword "cats" associated with the URL "https://www.example.com"


Scenario 4: Searching for a keyword
    Given a search index containing the keyword "cats" associated with the 
    " https://www.example.com"
    When I search for the keyword "cats"
    Then the search results should include the URL "https://www.example.com"
