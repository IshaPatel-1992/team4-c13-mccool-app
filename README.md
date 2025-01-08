# team4-c13-mccool-app

Common repository for Project3 as team4 from Cohort 13, which is to build a working full stack for McCool Leadership Consultant

# Getting Strated
## Step 1:
Clone the repository to your local machine. Open up your IDE (e.g. VSCode) and fire up a terminal. Then type <br>
`git clone https://github.com/mttinana/team4-c13-mccool-app.git `
## Step 2:
Create a separate branch and NEVER work directly in the "main" branch. We will create a our own branch under 'dev' branch.
## Step 3:
To create a branch do the following <br>
### Step 3a:
`git pull` (This will update your main branch)
### Step 3b:
`git checkout dev` (moves you to the dev branch)
### Step3c:
`git branch <new-branch-name>` (creates a new branch called new-branch-name) <br>
`git checkout <new-branch-name>` (moves you to the new branch. This is your playground, do whatever you like here.) <br>
## OR
### Step 3c:
`git checkout -b <new-branch-name>` (creates and moves you to the new branch called new-branch-name in one step. Cool!!!!)
## Step 4 (Highly recommended):
`git push -u origin <new-branch-name>` (This creates a remote copy of your local branch, so if your machine crashes your work won't be lost.)
## Step 5
Once you make code updates do following <br>
`git status` (tells you which files you modified, added, deleted) <br>
`git add <filename>` (saves the changes you made to a specific file) <br>
`git add <filename1> <filename2> <filename3> ... <filenameN>` (for saving changes to multiple files in one go)<br>
Optional: `git restore <filename>` (if you want to undo your changes to a certain file)<br>
`git commit -m "Commit message"` (EXTREMELY important that you put in commit message. This would help later on if some changes are needed to be reversed. The team will know exactly what that commit entailed.)<br>
`git push` (If you did Step 4 correctly. If not then you'll have to provide branch name everytime you push.)
## Step 6
Hop over to github.com, create a pull request (PR), review with team interanlly and then merge to dev. After merging code, we will make sure app should working fine, conflicts must be resolved at this branch and then pushed to main. This is when the master code gets updated. Since the repo is a free version, we can't set up a branch protection rule for forcing a code review.<br>
With this limitation, it is highly recommended that reviews are requested manually before merging at 'Dev' branch.

## Recommendations
1- Always (everyday, start of work) do `git pull` when you are working in your branch. This way your code will be updated with any other code updates made by other team mebers.<br>
2- Always delete the branch (both locally and remotely) once you have succesfully merged. This avoids a lot of confusion and keeps the repo clean.



