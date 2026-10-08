import {
  siApache,
  siArgo,
  siClaude,
  siCouchbase,
  siCursor,
  siDocker,
  siFirebase,
  siGithubcopilot,
  siGitlab,
  siGooglecloud,
  siHibernate,
  siJest,
  siJsonwebtokens,
  siJunit5,
  siKeycloak,
  siKubernetes,
  siLeaflet,
  siMaptiler,
  siMongodb,
  siMui,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNx,
  siOpenjdk,
  siOpentelemetry,
  siPinia,
  siReact,
  siReactivex,
  siReactquery,
  siRedhatopenshift,
  siRedux,
  siSelenium,
  siShadcnui,
  siSonarqubeserver,
  siSplunk,
  siSpring,
  siSpringboot,
  siSwagger,
  siTailwindcss,
  siTypeorm,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

// Skills are free text from Sanity, so match on keywords. Order matters: more specific first.
const rules: [RegExp, SimpleIcon | null][] = [
  [/react-intl|i18n/, null], // no logo; stops it matching React and falls back to the group icon
  [/reactor/, siReactivex],
  [/tanstack|react query/, siReactquery],
  [/react/, siReact],
  [/next/, siNextdotjs],
  [/vue/, siVuedotjs],
  [/typescript/, siTypescript],
  [/redux/, siRedux],
  [/pinia/, siPinia],
  [/tailwind/, siTailwindcss],
  [/material ui|\bmui\b/, siMui],
  [/shadcn/, siShadcnui],
  [/^nx\b/, siNx],
  [/spring boot/, siSpringboot],
  [/spring/, siSpring],
  [/java/, siOpenjdk],
  [/node/, siNodedotjs],
  [/nest/, siNestjs],
  [/swagger|openapi/, siSwagger],
  [/jwt|oauth/, siJsonwebtokens],
  [/hibernate|jpa/, siHibernate],
  [/apache poi|log4j/, siApache],
  [/typeorm/, siTypeorm],
  [/keycloak/, siKeycloak],
  [/mysql/, siMysql],
  [/mongo/, siMongodb],
  [/couchbase/, siCouchbase],
  [/leaflet/, siLeaflet],
  [/maptiler/, siMaptiler],
  [/docker/, siDocker],
  [/openshift/, siRedhatopenshift],
  [/kubernetes/, siKubernetes],
  [/argo/, siArgo],
  [/cloud run|google cloud/, siGooglecloud],
  [/firebase/, siFirebase],
  [/vercel/, siVercel],
  [/gitlab/, siGitlab],
  [/junit/, siJunit5],
  [/jest/, siJest],
  [/selenium/, siSelenium],
  [/sonar/, siSonarqubeserver],
  [/splunk/, siSplunk],
  [/opentelemetry/, siOpentelemetry],
  [/claude/, siClaude],
  [/copilot/, siGithubcopilot],
  [/cursor/, siCursor],
];

export type SkillLogo = { path: string; title: string; hover: string };

// Near-black brand colors would vanish on the dark theme, so those hover to the text color instead.
function hoverColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.2 ? "rgb(var(--ink))" : `#${hex}`;
}

export function skillLogo(name: string): SkillLogo | null {
  const key = name.toLowerCase();
  const icon = rules.find(([pattern]) => pattern.test(key))?.[1];
  return icon ? { path: icon.path, title: icon.title, hover: hoverColor(icon.hex) } : null;
}
