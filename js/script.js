/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);


  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);
  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('articles', articles);
  console.log(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    console.log(linkHTML);
    html = linkHTML + html;
  }

  /* [DONE] insert link into titleList */

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function generateTags() {

  /* [NEW] create a new variable allTags with empty array */

  let allTags = [];

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* [DONE] make html variable with empty string */

    let html = '';
    console.log(html);

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */

      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if(allTags.indexOf(linkHTML)== -1){

        /* [NEW] add generated code to allTags array */

        allTags.push(linkHTML);
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */

    tagList.innerHTML = allTags.join(' ');
  }
}
generateTags();

function tagClickHandler(event) {

  /* [DONE] prevent default action for this event */

  event.preventDefault();
  console.log(event);

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  console.log(tagLinks);

  /* [DONE] START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {

    /* [DONE] add class active */

    tagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
  }

}
addClickListenersToTags();

function generateAuthors() {

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find author wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get Author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor:', articleAuthor);

    /* [DONE] generate HTML of the link */

    const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    console.log('linkHTML:'.linkHTML);

    /* [DONE] add generated code to html variable */

    html = linkHTML + html;

    /* [DONE] insert HTML of all the links into the authors wrapper */

    authorsWrapper.innerHTML = html;
    console.log('html:', html);

    /* [DONE] END LOOP: for every article: */
  }
}
generateAuthors();

const authorClickHandler = function (event) {

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');
  console.log(author);

  /* [DONE] find all author links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeAuthor of activeAuthors) {

    /* [DONE] remove class active */

    activeAuthor.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  console.log(authorLinks);

  /* [DONE] START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {

    /* [DONE] add class active */

    authorLink.classList.add('active');

    /* [DONE]  END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author ="' + author + '"]');
};

function addClickListenersToAuthors() {

  /* [DONE] find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for (let authorLink of authorLinks) {

    /* [DONE] add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}
addClickListenersToAuthors();

