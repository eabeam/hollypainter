# Content Decisions Needed from Holly

*Generated 2026-03-15. Check off / answer each item so we can finalize the site.*

---

## 1. Book status: "At last, we listen closely"

The About page says "(Black Spring, 2026)" but the book page still says "Coming in 2025" and "Available for pre-order here."

- **Is the book now published?** If yes, we update to "Available here" and remove "Coming in 2025."
- **If not yet published**, what's the correct expected date?

File: `site-educenter/content/books/at-last-we-listen-closely-cryptic-crossword-poems/_index.md`

---

## 2. Updated CV

The site links to `holly-painter-cv-2021.pdf` — five years old.

- **Can Holly provide a current CV?** Drop it into `site-educenter/static/uploads/` and we'll update the link.

File: `site-educenter/content/pages/about.md` (line 4: `cv_file`)

---

## 3. CRVT research page

Currently just says "Content forthcoming." It shows in the Research menu.

- **Option A**: Holly provides content and we populate it.
- **Option B**: Hide it from the nav until ready (remove the `menu` block).
- **Option C**: Remove it entirely.

File: `site-educenter/content/research/crvt.md`

- CRVT page 
  - Overall description of CRVT 
  - Highlight Proud Little State 
  - Populate with upcoming events from UVM calendar (or if you can’t do that, links to here: https://events.uvm.edu/department/center_for_research_on_vermont)

​	•		⁃	Links to CRVT page: https://www.uvm.edu/cas/vermontresearch



---

## 4. Contact page — show email?

The contact page has a form but no email address displayed.

- **Should `holly@hollypainter.com` (or another address) be shown on the contact page?**

File: `site-educenter/content/pages/contact.md`

no - just the contact form for now, but it will forward to her own address 

---

## 5. Poetry item "37412639"

This entry has a numeric WordPress post ID as its title, published by "Holly Painter Archive," linking to an image (`On-the-way-to-English-fluency.jpg`).

- **Is this a real entry that needs a proper title, or a WordPress import artifact to delete?**

File: `site-educenter/content/poetry/37412639-hollypainter-com.md`





can we make a spreadsheet of the titles, links, image names that i can edit so we can clean up 

---

## 6. Featured poems

No poems are currently marked `featured: true`. The homepage and poetry page show arbitrary first items.

- **Which 3–6 poems should be featured?** Holly can pick by title or filename.

Directory: `site-educenter/content/poetry/`



This is the list of featured poems - you may have to do some work to figure this out: 





- Randomized poem-of-the-day 
- Afternoon in Swimming with Elephants
- 2 poems in Landfall 211
- January, Lake Champlain in Apeiron (but maybe just screenshot the page)
- 2 poems in Barrelhouse
- Cryptic Crossword XXXIII in Bombay Gin
- Field Trip in Borderlands
- The earlier Literary Shanghai sets: http://www.literaryshanghai.com/holly-painter-five-poems/ and http://www.literaryshanghai.com/holly-painter-five-poems-ii/
- 2 poems in Nimrod
- 3 poems in Delmarva Review
- The Tragedy of Space Opera in 4th River
- The First Hundred Days in Freezeray (which shows cover for Francis House right now)
- Boys on the Beach in Hawaii Review
- In Which We Depart in Hue and Cry
- 2 poems in JAAM 30
- 2 poems in Lunch Ticket
- Imaginary Syllabi
- Shipwrecked I Arrived in NZ Listener
- Mount Ebenezer Roadhouse in NZ Poetry Shelf
- 2 poems in Landfall 218
- Picton’s Morning Crust in Landfall 223
- 2 poems in Riprap 36
- 2 poems in Roads Taken
- Sonoran Song in Cream City Review
- 3 poems in Spectrum
- 2 poems in Sport 43
- Tell Me a Story in Storm Cellar
- Both poems in Turbine
- 2 poems in Sport 40



- Include all other poems
  - In a page you can click through to from featured page
  - Use “Poem Title” in *Journal* (year) instead of file name (I can probably find a list of these if it’s not obvious from files - pics are usually the cover)
  - If possible, by year rather than alphabetical

​	•		⁃	Some of the links are broken - can just skip those

---

## 7. Poetry landing page text

The current text has issues:
- "And, now and again, I write a short story or essay:" — ends with a colon but nothing follows
- Two bare URLs (not clickable links) to hollypainterpoetry.com and metronews.ca — both sites are now dead (timeout/503)

**Suggested fix**: Remove the dead links and the incomplete sentence. Keep only the `intro` field text (journal listing). Holly can confirm or provide replacement text.

File: `site-educenter/content/poetry/_index.md`

---

## 8. Broken external links (25 unique)

Most are literary journals or event pages that have gone offline. Options:

| Strategy | Effort | Result |
|---|---|---|
| Remove broken links, keep entry text | Low | Clean but loses references |
| Replace with Wayback Machine URLs | Medium | Preserves access |
| Leave as-is | Zero | Visitors hit dead links |

**Recommendation**: Remove links from visible pages (books, poetry landing). Leave old event page links as-is (low traffic). Holly's call.

Full list: `link-audit-broken.csv`

---

## 9. Social links

Currently only Facebook and LinkedIn. **Any other profiles to add?** (Instagram, Twitter/X, personal site, etc.)



EB:  No other links

---



## 10. Other writings 



- Misc writing page

  - Hymn - mayabe embed https://www.youtube.com/watch?v=M4t8NVppnH4. Have you Heard, by Holly Painter and Jantz A. Black  - link to publisher site https://www.hopepublishing.com/W256497_HAVE_YOU_HEARD

    

  - USA Today https://www.usatoday.com/story/opinion/voices/2025/08/21/kids-sports-college-ncaa-olympics-pressure/85562025007/

​	• Other fiction/essays/interviews/contributor spotlight listed on poetry page of original website (these got absorbed into “all poetry” matrix - they’re the ones with no picture that say “publication image”)



## 11. Teaching page: 



- 
  - K-M award info
  - Brief descriptions for recent classes (minus ENGL 1001)
  - Highlights teaching in HCOL, LAPP, LASP

​	•		⁃	UWC and GWC interim directorship with highlight on UWC AI research -                                        

2. i want to make sure her AI project with students (from her time as     

 interim undergraduea writing center director) is highlighted - where woudl   

 bea godo place to put this? I can share a report so you can prepare a     

 summary of the report as well (with a contact for more informaiton) 









## Quick fixes I can make right now once Holly answers:

- Update book status text (decision #1)
- Swap CV file (decision #2)
- Hide/remove CRVT page (decision #3)
- Add email to contact page (decision #4)
- Delete or rename poetry item 37412639 (decision #5)
- Mark featured poems (decision #6)
- Clean up poetry landing text (decision #7)
