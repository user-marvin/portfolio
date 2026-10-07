import { defineQuery } from "next-sanity";

export const siteContentQuery = defineQuery(`{
  "profile": *[_id == "profile"][0]{
    name, shortName, role, location, headline, currently, email, github, contactBlurb,
    "stats": coalesce(stats[]{value, label}, []),
    "summary": coalesce(summary, []),
    "principles": coalesce(principles[]{title, body}, []),
    "resumeUrl": resumeFile.asset->url
  },
  "featuredWork": *[_id == "featuredWork"][0]{
    "show": coalesce(show, true), title, intro,
    "tiers": coalesce(tiers[]{label, title, "items": coalesce(items, [])}, []),
    "delivery": coalesce(delivery, []),
    "outcomes": coalesce(outcomes[]{title, body}, [])
  },
  "experience": *[_id == "experience"][0].jobs[]{
    company, role, period, mode, project,
    "highlights": coalesce(highlights, []),
    "stack": coalesce(stack, [])
  },
  "projects": *[_id == "projects"][0]{
    "showMoreCard": coalesce(showMoreCard, true),
    "items": coalesce(items[]{
      title, year, description,
      "stack": coalesce(stack, []),
      "links": coalesce(links[]{label, href}, []),
      "image": select(defined(image.asset) => {
        "url": image.asset->url,
        "alt": image.alt,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height
      })
    }, [])
  },
  "skills": *[_id == "skills"][0].groups[]{group, "items": coalesce(items, [])},
  "education": *[_id == "education"][0]{
    "entries": coalesce(entries[]{title, org, period, note}, []),
    "certifications": coalesce(certifications, [])
  }
}`);
