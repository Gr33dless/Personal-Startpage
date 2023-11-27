/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"61apwy8gFemL8prV","label":"gaming","bookmarks":[{"id":"1rINoGX5mChO1OKL","label":"gog-games","url":"https://gog-games.to/"},{"id":"MOQjBuHkJNdaHzqg","label":"cs.rin","url":"https://cs.rin.ru/forum/index.php?sid=f8b78ed0a4826aaa5dd15d1df1db73ae"},{"id":"QkTExz5FetoVcTKF","label":"torrminatorr","url":"https://forum.torrminatorr.com/"}]},{"id":"LwkJ6pNxO2MYSBk8","label":"guides","bookmarks":[{"id":"sqA6CfmGOU2brU5O","label":"fmhy","url":"https://fmhy.pages.dev/"},{"id":"YbnL4MT7NUHXngYS","label":"privacyguides","url":"https://www.privacyguides.org/en/"},{"id":"wGpc0jVBWf83NOgp","label":"ripped","url":"https://ripped.guide/"}]},{"id":"PNFltlSjfAiZankf","label":"browse","bookmarks":[{"id":"ZR5ZC1yUvgMc2YG7","label":"lainchan","url":"https://lainchan.org/"},{"id":"ETfoLzYOeG95Nzn6","label":"allmusic","url":"https://www.allmusic.com/"},{"id":"WEL8z0UI0QPewpGE","label":"mangadex","url":"https://mangadex.org/"}]},{"id":"tXMudnLadHPhKPyT","label":"news","bookmarks":[{"id":"MPpBmuxDn11Ivdki","label":"itsfoss","url":"https://itsfoss.com/"},{"id":"tf4pqzRpDIiGGT9L","label":"theverge","url":"https://www.theverge.com/"},{"id":"ep33ebf5emGFwsWc","label":"torrentfreak","url":"https://torrentfreak.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
