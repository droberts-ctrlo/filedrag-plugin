const fs = require("fs");
const path = require("path");

const {exec} = require("child_process");

const sass = require("sass");

const buildDir="./build";

function clean() {
    if(fs.existsSync(buildDir)) {
        fs.rmSync(buildDir,{ recursive: true, force: true })
    }
}

function css() {
    const compiler = sass.initCompiler()
    const result = compiler.compile("./src/css/index.scss", { sourceMap: false });
    if(!fs.existsSync(path.join(buildDir, "css"))) {
        fs.mkdirSync(path.join(buildDir, "css"), {recursive: true});
    }
    fs.writeFileSync(path.join(buildDir, "css", "index.css"), result.css);
}

function compileTypescript() {
    exec("yarn tsc -b tsconfig.cjs.json tsconfig.esm.json tsconfig.types.json",()=>{})
}

function createEsmPackageJSON() {
    fs.readdir(buildDir, function(err,dirs) {
        if(err) throw err;

        dirs.forEach(function (dir) {
            if(dir === "esm") {
                var packageJsonFile = path.join(buildDir,dir,"/package.json");
                if(!fs.existsSync(packageJsonFile)) {
                    fs.writeFile(
                        packageJsonFile,
                        new Uint8Array(Buffer.from('{"type": "module"}')),
                        function(err) {
                            if(err) {
                                throw err;
                            }
                        }
                    );
                }
            }
        });
    });
}

clean()
css();
compileTypescript();
createEsmPackageJSON();
createEsmPackageJSON();