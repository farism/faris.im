set -e

# get target parameter
if [ -z $1 ]
then
  target='latest'
else
  target=$1
fi

# show where we are on the machine
pwd
remote=$(git config remote.origin.url)
mkdir gh-pages-branch
cd gh-pages-branch

# config git author
# git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
# git config --global user.name "$GH_NAME" > /dev/null 2>&1

# now lets setup a new repo so we can update the gh-pages branch
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


# stage any changes and new files
git add -A

# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Publish to GitHub pages [ci skip]"

git push --force --quiet origin gh-pages

cd ..
rm -rf gh-pages-branch

echo "Finished Deployment!"
