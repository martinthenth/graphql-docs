package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/vektah/gqlparser/v2"
	"github.com/vektah/gqlparser/v2/ast"
)

const (
	inputFolder = "./graph"
	outputFile  = "./app/lib/graph.json"
)

type graph struct {
	Version    string                 `json:"version"`
	Directives map[string]interface{} `json:"directives"`
	Enums      enums                  `json:"enums"`
	Inputs     inputs                 `json:"inputs"`
	Scalars    scalars                `json:"scalars"`
	Types      objects                `json:"types"`
}

type enums map[string]enum
type enum struct {
	Values      *enumValues `json:"values"`
	Description *string     `json:"description"`
}
type enumValues map[string]enumValue
type enumValue struct {
	Description *string `json:"description"`
}

type inputs map[string]input
type input struct {
	Description *string  `json:"description"`
	Fields      fields   `json:"fields"`
	FieldNames  []string `json:"fieldNames"`
}

type objects map[string]object
type object struct {
	Description *string  `json:"description"`
	Fields      fields   `json:"fields"`
	FieldNames  []string `json:"fieldNames"`
}

type scalars map[string]scalar
type scalar struct {
	Description *string `json:"description"`
}

type fields map[string]field
type field struct {
	Name          string           `json:"name"`
	Type          string           `json:"type"`
	Description   *string          `json:"description"`
	Arguments     *fieldArguments  `json:"arguments"`
	ArgumentNames []string         `json:"argumentNames"`
	Directives    *fieldDirectives `json:"directives"`
}
type fieldArguments map[string]fieldArgument
type fieldArgument struct {
	Name        string                   `json:"name"`
	Type        string                   `json:"type"`
	Description *string                  `json:"description"`
	Directives  *fieldArgumentDirectives `json:"directives"`
}
type fieldDirectives map[string]fieldDirective
type fieldDirective map[string]interface{}
type fieldArgumentDirectives map[string]fieldArgumentDirective
type fieldArgumentDirective map[string]interface{}

func main() {
	log.Print("Generating documentation...")
	t := time.Now()
	s, err := readInput()
	if err != nil {
		log.Fatal(err)
	}

	g, err := buildGraph(s)
	if err != nil {
		log.Fatal(err)
	}

	g.Version = time.Now().UTC().Format(time.RFC3339)
	_, err = writeGraph(g)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Generated documentation in %s", time.Since(t))
}

func readInput() (*ast.Schema, error) {
	fs, err := os.ReadDir(inputFolder)
	if err != nil {
		return nil, err
	}

	ss := []*ast.Source{}
	for _, f := range fs {
		sr, err := os.ReadFile(filepath.Join(inputFolder, f.Name()))
		if err != nil {
			return nil, err
		}

		ss = append(ss, &ast.Source{
			Name:  f.Name(),
			Input: string(sr),
		})
	}

	s, err := gqlparser.LoadSchema(ss...)
	if err != nil {
		return nil, err
	}

	return s, nil
}

func buildGraph(s *ast.Schema) (*graph, error) {
	g := &graph{
		Directives: map[string]interface{}{},
		Enums:      enums{},
		Inputs:     inputs{},
		Scalars:    scalars{},
		Types:      objects{},
	}
	for _, st := range s.Types {
		switch st.Kind {
		case ast.Enum:
			if !st.BuiltIn {
				parseEnum(g, st)
			}
		case ast.InputObject:
			parseInput(g, st)
		case ast.Object:
			if !st.BuiltIn {
				parseType(g, st)
			}
		case ast.Scalar:
			parseScalar(g, st)
		default:
			return nil, fmt.Errorf("unknown type kind: %v", st.Kind)
		}
	}

	return g, nil
}

func writeGraph(g *graph) (*graph, error) {
	gj, err := json.MarshalIndent(g, "", "  ")
	if err != nil {
		return nil, err
	}

	f, err := os.Create(outputFile)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	_, err = f.WriteString(string(gj) + "\n")
	if err != nil {
		return nil, err
	}

	return g, nil
}

func parseEnum(g *graph, e *ast.Definition) {
	evs := enumValues{}
	for _, v := range e.EnumValues {
		evs[v.Name] = enumValue{Description: toPointer(v.Description)}
	}
	if len(e.EnumValues) == 0 {
		evs = nil
	}

	g.Enums[e.Name] = enum{
		Description: toPointer(e.Description),
		Values:      &evs,
	}
}

func parseInput(g *graph, i *ast.Definition) {
	ifs := fields{}
	for _, fd := range i.Fields {
		ifas := parseFieldArguments(fd)
		ifds := parseFieldDirectives(fd)
		ifs[fd.Name] = field{
			Name:        fd.Name,
			Type:        fd.Type.String(),
			Description: toPointer(fd.Description),
			Arguments:   &ifas,
			Directives:  &ifds,
		}
	}
	if len(i.Fields) == 0 {
		ifs = nil
	}

	g.Inputs[i.Name] = input{
		Description: toPointer(i.Description),
		Fields:      ifs,
	}
}

func parseType(g *graph, t *ast.Definition) {
	ofs := fields{}
	for _, tf := range t.Fields {
		if strings.HasPrefix(tf.Name, "__") {
			continue
		}

		ofas := parseFieldArguments(tf)
		ofds := parseFieldDirectives(tf)
		ofs[tf.Name] = field{
			Name:        tf.Name,
			Type:        tf.Type.String(),
			Description: toPointer(tf.Description),
			Arguments:   &ofas,
			Directives:  &ofds,
		}
	}
	if len(t.Fields) == 0 {
		ofs = nil
	}

	g.Types[t.Name] = object{
		Description: toPointer(t.Description),
		Fields:      ofs,
	}
}

func parseScalar(g *graph, s *ast.Definition) {
	g.Scalars[s.Name] = scalar{Description: toPointer(s.Description)}
}

func parseFieldArguments(fd *ast.FieldDefinition) fieldArguments {
	ofas := fieldArguments{}
	for _, tfa := range fd.Arguments {
		ofads := parseFieldArgumentDirectives(tfa)
		ofas[tfa.Name] = fieldArgument{
			Type:        tfa.Type.String(),
			Description: toPointer(tfa.Description),
			Directives:  &ofads,
		}
	}
	if len(fd.Arguments) == 0 {
		ofas = nil
	}

	return ofas
}

func parseFieldArgumentDirectives(ad *ast.ArgumentDefinition) fieldArgumentDirectives {
	ofads := fieldArgumentDirectives{}
	for _, tfad := range ad.Directives {
		ofads[tfad.Name] = parseFieldArgumentDirective(tfad)
	}
	if len(ad.Directives) == 0 {
		ofads = nil
	}

	return ofads
}

func parseFieldArgumentDirective(d *ast.Directive) fieldArgumentDirective {
	ofad := fieldArgumentDirective{}
	for _, a := range d.Arguments {
		ofad[a.Name] = toPointer(a.Value.String())
	}
	if len(d.Arguments) == 0 {
		ofad = nil
	}

	return ofad
}

func parseFieldDirectives(fd *ast.FieldDefinition) fieldDirectives {
	ifds := fieldDirectives{}
	for _, d := range fd.Directives {
		ifd := fieldDirective{}
		for _, a := range d.Arguments {
			ifd[a.Name] = a.Value.String()
		}
		if len(d.Arguments) == 0 {
			ifd = nil
		}

		ifds[d.Name] = ifd
	}
	if len(fd.Directives) == 0 {
		ifds = nil
	}

	return ifds
}

func toPointer(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
