import Image from "next/image";
import { HTMLAttributes } from "react";
import { Code } from "@/components/ui/code";
import { Grid } from "@/components/ui/grid";
import { List, ListItem } from "@/components/ui/list";
import { H2, H3, H4, H5, P } from "@/components/ui/typography";

interface DocsContentIntroProps extends HTMLAttributes<HTMLDivElement> {}

export function DocsContentIntro({}: DocsContentIntroProps) {
  return (
    <Grid>
      <div className="p-4">
        <H2>Introduction</H2>
      </div>
      <Grid gap="sm" className="p-4 border-t">
        <header>
          <H3>Getting started</H3>
        </header>
        <Grid gap="md" items="start" className="grid-cols-2">
          <Grid gap="md">
            <Grid gap="sm">
              <H4>Installation</H4>
              <List>
                <ListItem>
                  <P>
                    Set up <Code>asdf</Code> on your computer.
                  </P>
                </ListItem>
                <ListItem>
                  <P>
                    Run <Code>asdf install</Code> to install Go, Node.js, and Task.
                  </P>
                </ListItem>
              </List>
            </Grid>
            <Grid gap="sm">
              <H4>Usage</H4>
              <H5>Generating the GraphQL JSON</H5>
              <List>
                <ListItem>
                  <P>
                    Run <Code>docs.generate</Code> to generate app/lib/graph.json.
                  </P>
                </ListItem>
              </List>
              <H5>Running the server</H5>
              <List>
                <ListItem>
                  <P>
                    Run <Code>cd app</Code>to enter the Next.js folder.
                  </P>
                </ListItem>
                <ListItem>
                  <P>
                    Run <Code>npm run dev</Code> to run the Next.js server.
                  </P>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
