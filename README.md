## Bookshelf App

#### App Description:
Bookshelf allows you to collect and store all the books you have read or have yet to read. Organize your books in unique bookshelves and share them with the rest of your community on the "library" page. 

#### Technology Used:
* Javascript
* Mongoose
* CSS
* HTML

#### Instructions:

[Link to Deployed Project]

#### Code Snippets:

```Javascript
    <%if (!shelves.length>0){ %>
        <%="You do not have any shelves yet!" %>
            <% } else { %>
                <div class="bookshelf">
                    <% shelves.forEach(shelf=> { %>
                        <li>
                            <a class="shelf-title" href="/shelves/<%=shelf._id %>">
                                <%=shelf.title%>
                            </a>
                            <%})%>
                        </li>
                        <%}%>
                </div>
```

#### Future Plans:
* Connect to google books API

