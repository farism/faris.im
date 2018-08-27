set -e

echo "Starting Deployment..."

# show where we are on the machine
pwd

# now lets setup a new repo so we can update the gh-pages branch
remote=$(git config remote.origin.url)
mkdir gh-pages-branch
cd gh-pages-branch
git init
git remote add --fetch origin "$remote"

# switch into the the gh-pages branch
if git rev-parse --verify origin/gh-pages > /dev/null 2>&1

then
    git checkout gh-pages
else
    git checkout --orphan gh-pages
fi

# copy new files
rm -r *
cp -r ../dist/* .

# stage any changes and new files
git add -A

# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
# git commit --allow-empty -m "Publish to GitHub pages [ci skip]"

# force push to gh-pages branch
# git push --force --quiet origin gh-pages

cd ..
rm -rf gh-pages-branch

echo "Finished Deployment!"
