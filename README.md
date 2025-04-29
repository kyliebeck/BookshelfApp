## Bookshelf App

#### App Description:


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

