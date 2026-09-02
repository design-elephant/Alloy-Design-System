import { useState } from "react";
import {
  ThemeProvider,
  useTheme,
  Button,
  IconButton,
  TextField,
  Checkbox,
  Radio,
  Switch,
  Chip,
  Card,
  Divider,
  Text,
  Link,
  Breadcrumbs,
  Table,
  Image,
  AspectRatio,
  Grid,
  GridItem,
  Tabs,
  Dialog,
  Popover,
  Icon,
} from "../src";

// All icons are Material Symbols via <Icon>. Browse names at fonts.google.com/icons
const SunIcon = <Icon name="light_mode" />;
const MoonIcon = <Icon name="dark_mode" />;
const SearchIcon = <Icon name="search" size={18} />;
const PlusIcon = <Icon name="add" />;
const HeartIconOutline = <Icon name="favorite" />;
const HeartIconFill = <Icon name="favorite" fill />;

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="demo-section">
      <div className="demo-section__head">
        <Text role="headline-md">{title}</Text>
        <Text role="body-md" color="muted">
          {desc}
        </Text>
      </div>
      {children}
    </section>
  );
}

function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  return (
    <IconButton
      aria-label="Toggle color theme"
      variant="outlined"
      icon={resolved === "dark" ? SunIcon : MoonIcon}
      onClick={toggle}
    />
  );
}

const SWATCHES = [
  "sys-primary",
  "sys-primary-container",
  "sys-secondary",
  "sys-secondary-container",
  "sys-error",
  "sys-error-container",
  "sys-surface",
  "sys-surface-container",
  "sys-surface-container-high",
  "sys-outline",
  "sys-on-surface",
  "sys-on-surface-variant",
];

// role → [weight, size/line-height, tracking] — must match tokens.css
const TYPE_SPEC: [string, string, string, string][] = [
  ["display-lg", "700", "46 / 52", "-0.015em"],
  ["display-md", "700", "37 / 44", "-0.015em"],
  ["display-sm", "700", "29 / 36", "-0.015em"],
  ["headline-lg", "700", "24 / 32", "0"],
  ["headline-md", "600", "20 / 28", "0"],
  ["headline-sm", "600", "18 / 26", "0"],
  ["title-lg", "600", "16 / 24", "0"],
  ["title-md", "600", "14 / 20", "0"],
  ["title-sm", "600", "12 / 16", "0.01em"],
  ["body-lg", "400", "16 / 26", "0"],
  ["body-md", "400", "14 / 22", "0"],
  ["body-sm", "400", "12 / 18", "0"],
  ["label-lg", "600", "14 / 20", "0.01em"],
  ["label-md", "600", "12 / 16", "0.01em"],
  ["label-sm", "600", "11 / 16", "0.01em"],
];

// size → [height, inline padding, radius, label token]
const BUTTON_SPEC: [string, string, string, string, string][] = [
  ["sm", "32px", "12px (space-4)", "10px (radius-md)", "label-md · 12/16 · 600"],
  ["md", "40px", "16px (space-5)", "14px (radius-lg)", "label-lg · 14/20 · 600"],
  ["lg", "48px", "24px (space-7)", "14px (radius-lg)", "label-lg · 14/20 · 600"],
];

const BUTTON_COLOR_SPEC: [string, string, string][] = [
  ["filled", "--alloy-sys-primary", "--alloy-sys-on-primary"],
  ["tonal", "--alloy-sys-primary-container", "--alloy-sys-on-primary-container"],
  ["elevated", "--alloy-sys-surface-container-low + elev-1", "--alloy-sys-primary"],
  ["outlined", "transparent · 1px --alloy-sys-outline", "--alloy-sys-primary"],
  ["text", "transparent", "--alloy-sys-primary"],
  ["danger", "--alloy-sys-error", "--alloy-sys-on-error"],
];

function Showcase() {
  const [text, setText] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>({
    Design: true,
    Engineering: false,
    Research: false,
  });
  const [plan, setPlan] = useState("standard");
  const [chips, setChips] = useState(["Portland", "Austin", "Denver"]);

  return (
    <div className="demo-shell">
      <header className="demo-header">
        <div className="demo-brand">
          <span className="demo-brand__dot" />
          <Text role="title-lg">Alloy</Text>
          <Chip variant="assist">v0.1</Chip>
        </div>
        <ThemeToggle />
      </header>

      <main className="demo-main">
        <div className="demo-section__head">
          <Text role="display-sm">A system for creative work.</Text>
          <Text role="body-lg" color="muted">
            Material 3's color roles, state layers, elevation and motion on an
            orange lead, a reserved deep-red for weight, and warm grey carrying
            the scan. Generous rounding, brisk motion — confident and easy to
            read.
          </Text>
          <div className="demo-row" style={{ marginTop: "8px" }}>
            <Button variant="filled">Primary action</Button>
            <Button
              variant="filled"
              style={{
                background: "var(--alloy-sys-secondary)",
                color: "var(--alloy-sys-on-secondary)",
              }}
            >
              Secondary
            </Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="text">Learn more</Button>
          </div>
        </div>

        <Section title="Color roles" desc="Semantic tokens resolve per theme. Toggle the theme in the header.">
          <div className="demo-swatches">
            {SWATCHES.map((name) => (
              <div className="demo-swatch" key={name}>
                <div
                  className="demo-swatch__chip"
                  style={{ background: `var(--alloy-${name})` }}
                />
                <span className="demo-swatch__name">--alloy-{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Typography"
          desc="Family: Inter (var --alloy-font-sans; swap for a licensed face). All sizes in px."
        >
          <div className="demo-type-table">
            <div className="demo-type-table__head">
              <span>Role · token</span><span>Weight</span><span>Size / line-height</span><span>Tracking</span>
            </div>
            {TYPE_SPEC.map(([role, w, sl, tr]) => (
              <div className="demo-type-table__row" key={role}>
                <span className="demo-mono">--alloy-type-{role}</span>
                <span>{w}</span>
                <span>{sl}</span>
                <span>{tr}</span>
              </div>
            ))}
          </div>
          <Divider />
          <div className="demo-type-specimen">
            {(["display-md", "headline-lg", "title-lg", "body-md", "label-lg"] as const).map(
              (role) => (
                <Text role={role} key={role} as="p">
                  {role} — The quick brown fox jumps over the lazy dog
                </Text>
              ),
            )}
          </div>
        </Section>

        <Section title="Button" desc="Six variants, three sizes. Full spec below — size, spacing, radius, colour tokens, states.">
          <div className="demo-row">
            <Button variant="filled">Filled</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="elevated">Elevated</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="danger">Delete</Button>
          </div>
          <div className="demo-type-table">
            <div className="demo-type-table__head">
              <span>Size</span><span>Height</span><span>Inline padding</span><span>Radius</span><span>Label</span>
            </div>
            {BUTTON_SPEC.map(([s, h, p, r, l]) => (
              <div className="demo-type-table__row" key={s}>
                <span className="demo-mono">{s}</span><span>{h}</span><span>{p}</span><span>{r}</span><span>{l}</span>
              </div>
            ))}
          </div>
          <div className="demo-type-table">
            <div className="demo-type-table__head demo-type-table__head--3">
              <span>Variant</span><span>Container</span><span>Label / icon colour</span>
            </div>
            {BUTTON_COLOR_SPEC.map(([v, bg, fg]) => (
              <div className="demo-type-table__row demo-type-table__row--3" key={v}>
                <span className="demo-mono">{v}</span>
                <span className="demo-mono">{bg}</span>
                <span className="demo-mono">{fg}</span>
              </div>
            ))}
          </div>
          <Text role="body-sm" color="muted">
            States (all variants): <b>hover</b> +8% state layer · <b>focus-visible</b> 2px
            --alloy-sys-primary ring, 2px offset · <b>pressed</b> +10% state layer ·
            <b> disabled</b> 38% on-surface text / 12% on-surface container · <b>loading</b>{" "}
            spinner, label hidden, interaction blocked. State layer sits behind the label,
            so contrast never drops on hover.
          </Text>
          <div className="demo-row">
            <Button size="sm" startIcon={PlusIcon}>
              Small
            </Button>
            <Button size="md" startIcon={PlusIcon}>
              Medium
            </Button>
            <Button size="lg" startIcon={PlusIcon}>
              Large
            </Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section title="Icon button" desc="Standard, filled, tonal, outlined — with a selectable toggle state.">
          <div className="demo-row">
            <IconButton aria-label="Search" icon={SearchIcon} />
            <IconButton aria-label="Add" variant="filled" icon={PlusIcon} />
            <IconButton aria-label="Add" variant="tonal" icon={PlusIcon} />
            <IconButton aria-label="Search" variant="outlined" icon={SearchIcon} />
            <ToggleFav />
          </div>
        </Section>

        <Section title="Text field" desc="Outlined and filled, with labels, helper text, adornments and error state.">
          <div className="demo-grid">
            <TextField
              label="Full name"
              placeholder="Ada Lovelace"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <TextField
              label="Search"
              type="search"
              variant="filled"
              placeholder="Find anything"
              startAdornment={SearchIcon}
            />
            <TextField
              label="Email"
              defaultValue="not-an-email"
              error="Enter a valid email address."
              required
            />
            <TextField label="Disabled" value="Locked" disabled />
          </div>
        </Section>

        <Section title="Selection controls" desc="Checkbox, radio and switch share the Material interaction model.">
          <div className="demo-row" style={{ alignItems: "flex-start", gap: "48px" }}>
            <div className="demo-stack">
              <Checkbox label="Ship weekly digest" defaultChecked />
              <Checkbox label="Partial selection" indeterminate />
              <Checkbox label="Disabled" disabled />
            </div>
            <div className="demo-stack">
              {["standard", "priority", "express"].map((v) => (
                <Radio
                  key={v}
                  name="plan"
                  label={`${v[0].toUpperCase()}${v.slice(1)} delivery`}
                  value={v}
                  checked={plan === v}
                  onChange={() => setPlan(v)}
                />
              ))}
            </div>
            <div className="demo-stack">
              <Switch label="Airplane mode" />
              <Switch label="Wi-Fi" defaultChecked />
              <Switch label="Bluetooth" labelPosition="start" defaultChecked />
            </div>
          </div>
        </Section>

        <Section title="Chip" desc="Assist, filter (toggle), input (removable) and suggestion.">
          <div className="demo-row">
            {Object.entries(filters).map(([label, on]) => (
              <Chip
                key={label}
                variant="filter"
                selected={on}
                onClick={() =>
                  setFilters((f) => ({ ...f, [label]: !f[label] }))
                }
              >
                {label}
              </Chip>
            ))}
          </div>
          <div className="demo-row">
            {chips.map((c) => (
              <Chip
                key={c}
                variant="input"
                onRemove={() => setChips((list) => list.filter((x) => x !== c))}
              >
                {c}
              </Chip>
            ))}
            <Chip variant="assist" startIcon={PlusIcon} onClick={() => {}}>
              Add city
            </Chip>
          </div>
        </Section>

        <Section title="Card" desc="Elevated, filled and outlined containers. Interactive cards gain a state layer.">
          <div className="demo-grid">
            <Card variant="elevated">
              <Text role="title-md">Elevated</Text>
              <Text role="body-sm" color="muted">
                Subtle shadow, no surface tint.
              </Text>
            </Card>
            <Card variant="filled">
              <Text role="title-md">Filled</Text>
              <Text role="body-sm" color="muted">
                Sits on a container surface.
              </Text>
            </Card>
            <Card variant="outlined" interactive onClick={() => {}}>
              <Text role="title-md">Outlined · interactive</Text>
              <Text role="body-sm" color="muted">
                Hover / focus me — 1.5px ring, not shadow alone.
              </Text>
              <Divider style={{ margin: "12px 0" }} />
              <div className="demo-row">
                <Button size="sm" variant="text">
                  Action
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        <Section title="Link" desc="Inline, standalone, subtle and quiet — link text runs one step darker than primary for AA.">
          <Text role="body-md">
            Read the <Link href="#link">inline documentation</Link>, jump to a{" "}
            <Link href="#" variant="standalone">
              standalone link
            </Link>
            , or open the{" "}
            <Link href="https://example.com" external>
              changelog
            </Link>
            .
          </Text>
        </Section>

        <Section title="Breadcrumbs" desc="Collapsing trail with an accessible current-page marker.">
          <Breadcrumbs
            items={[
              { label: "Home", href: "#" },
              { label: "Projects", href: "#" },
              { label: "Case studies", href: "#" },
              { label: "Rebranding a transit app" },
            ]}
          />
          <Breadcrumbs
            maxItems={3}
            items={[
              { label: "Home", href: "#" },
              { label: "Work", href: "#" },
              { label: "2024", href: "#" },
              { label: "Q3", href: "#" },
              { label: "Wayfinding" },
            ]}
          />
        </Section>

        <Section title="Elevation" desc="Levels 1–2 stay neutral; 3–5 cast a warm orange-brown shadow so lifted surfaces read as branded.">
          <div className="demo-row" style={{ gap: "24px", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className="demo-elevation-tile"
                style={{ boxShadow: `var(--alloy-elevation-${lvl})` }}
              >
                <Text role="label-md">Level {lvl}</Text>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Tabs" desc="Underline and pill variants. Roving tabindex, arrow-key navigation, managed panels.">
          <Tabs defaultValue="overview">
            <Tabs.List aria-label="Project sections">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="process">Process</Tabs.Tab>
              <Tabs.Tab value="outcomes">Outcomes</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              <Text role="body-md" color="muted">
                A six-week rebrand of a regional transit app — new wayfinding
                system, refreshed identity, and a component library.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value="process">
              <Text role="body-md" color="muted">
                Audit → journey mapping → concept sprints → usability testing → build.
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value="outcomes">
              <Text role="body-md" color="muted">
                Task success up 22%, support tickets about trip planning down 40%.
              </Text>
            </Tabs.Panel>
          </Tabs>
          <Tabs defaultValue="grid" variant="pill">
            <Tabs.List aria-label="View">
              <Tabs.Tab value="grid">Grid</Tabs.Tab>
              <Tabs.Tab value="list">List</Tabs.Tab>
              <Tabs.Tab value="map">Map</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="grid">
              <Text role="body-sm" color="muted">Grid view</Text>
            </Tabs.Panel>
            <Tabs.Panel value="list">
              <Text role="body-sm" color="muted">List view</Text>
            </Tabs.Panel>
            <Tabs.Panel value="map">
              <Text role="body-sm" color="muted">Map view</Text>
            </Tabs.Panel>
          </Tabs>
        </Section>

        <Section title="Table" desc="Density, striping, hover, sticky header, right-aligned numeric columns.">
          <Table striped hoverable>
            <caption>Recent projects</caption>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Year</th>
                <th data-align="end">Hours</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Transit wayfinding", "MetroLine", 2024, 312],
                ["Portfolio system", "Self", 2024, 96],
                ["Booking flow redesign", "Northwind", 2023, 240],
              ].map(([p, c, y, h]) => (
                <tr key={p as string}>
                  <td>{p}</td>
                  <td>{c}</td>
                  <td>{y}</td>
                  <td data-align="end">{h}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        <Section title="Media" desc="AspectRatio locks the frame; Image adds fit, rounding, lazy-load shimmer, caption and fallback. Cards take a full-bleed media slot.">
          <Grid columns={12} gap={5} collapse>
            <GridItem span={4}>
              <Image ratio="square" radius="lg" src={photo("a")} alt="Project thumbnail A" />
            </GridItem>
            <GridItem span={4}>
              <Image ratio="square" radius="lg" src={photo("b")} alt="Project thumbnail B" />
            </GridItem>
            <GridItem span={4}>
              <Image
                ratio="square"
                radius="lg"
                src="https://invalid.example/missing.jpg"
                alt="Broken image demo"
              />
            </GridItem>
            <GridItem span={6}>
              <Card
                variant="outlined"
                padding={0}
                interactive
                onClick={() => {}}
                media={<AspectRatio ratio="video"><div style={{ background: photoGradient("c") }} /></AspectRatio>}
              >
                <div style={{ padding: 16, display: "grid", gap: 4 }}>
                  <Text role="title-md">Card with media</Text>
                  <Text role="body-sm" color="muted">Full-bleed 16:9 header, clipped to the card radius.</Text>
                </div>
              </Card>
            </GridItem>
            <GridItem span={6}>
              <Image
                ratio="video"
                radius="lg"
                src={photo("d")}
                alt="A wide project shot"
                caption="Image with a figcaption."
              />
            </GridItem>
          </Grid>
        </Section>

        <Section title="Grid" desc="12-column CSS grid with a max-width Container. This whole page is laid out with it.">
          <Grid columns={12} gap={3} collapse>
            {[6, 6, 4, 4, 4, 3, 3, 3, 3].map((s, i) => (
              <GridItem key={i} span={s}>
                <div className="demo-grid-cell">span {s}</div>
              </GridItem>
            ))}
          </Grid>
        </Section>

        <Section title="Overlays" desc="Dialog (focus-trapped modal, scroll lock, restore focus) and Popover (anchored, flips, dismiss on outside click / Esc).">
          <div className="demo-row">
            <DemoDialog />
            <Popover
              placement="bottom-start"
              arrow
              content={
                <div style={{ display: "grid", gap: 8 }}>
                  <Text role="title-sm">Share this project</Text>
                  <Text role="body-sm" color="muted">
                    Anyone with the link can view.
                  </Text>
                  <TextField
                    label="Link"
                    defaultValue="alloy.design/p/transit"
                    fullWidth
                  />
                </div>
              }
            >
              <Button variant="outlined">Open popover</Button>
            </Popover>
          </div>
        </Section>
      </main>
    </div>
  );
}

function photoGradient(seed: string) {
  const hues: Record<string, string> = {
    a: "18, 92%",
    b: "8, 62%",
    c: "24, 88%",
    d: "12, 40%",
  };
  const h = hues[seed] ?? "20, 70%";
  return `linear-gradient(135deg, hsl(${h} 55%), hsl(${h} 28%))`;
}
function photo(seed: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${seed === "b" ? "#c23328" : seed === "d" ? "#8a5a00" : "#e5651b"}'/>
      <stop offset='1' stop-color='#2e2b28'/>
    </linearGradient></defs>
    <rect width='400' height='400' fill='url(#g)'/>
    <circle cx='${seed === "a" ? 120 : 280}' cy='160' r='70' fill='rgba(255,255,255,0.14)'/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function DemoDialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="filled" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Publish this case study?"
        description="It will be visible on your public portfolio immediately. You can unpublish at any time."
        footer={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setOpen(false)}>
              Publish
            </Button>
          </>
        }
      >
        <Text role="body-md" color="muted">
          Focus is trapped here, Escape closes, scroll is locked, and focus
          returns to the trigger on close.
        </Text>
      </Dialog>
    </>
  );
}

function ToggleFav() {
  const [on, setOn] = useState(false);
  return (
    <IconButton
      aria-label={on ? "Remove from favorites" : "Add to favorites"}
      variant="standard"
      selected={on}
      icon={on ? HeartIconFill : HeartIconOutline}
      onClick={() => setOn((v) => !v)}
    />
  );
}

export function App() {
  return (
    <ThemeProvider defaultMode="light">
      <Showcase />
    </ThemeProvider>
  );
}
