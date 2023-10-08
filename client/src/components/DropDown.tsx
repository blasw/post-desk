import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAppDispatch } from '../hooks/reduxHooks'
import { changeSortBy } from '../store/slices/postsSlice'
import { useSelector } from 'react-redux'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type SortTerm = 'new' | 'most_likes' | 'yours' | "none";

export default function DropDown() {
  const { sortBy } = useSelector((state: { posts: { sortBy: SortTerm } }) => state.posts);

  const useDispatch = useAppDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left w-32">
      <div>
        <Menu.Button className="select-none inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#222d3c] px-3 py-2 text-sm font-semibold text-gray-300  ring-1 ring-inset transition-all ring-[#222d3c] hover:ring-gray-300">
          {sortBy === "none" ? "Sort By" : sortBy === "new" ? "Newest" : sortBy === "most_likes" ? "Most Likes" : "Your Posts"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#222d3c] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    sortBy !== "new" ? useDispatch(changeSortBy("new")) : null;
                  }}
                  className={classNames(
                    active ? 'bg-gray-800 text-gray-300' : 'text-gray-300',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                >
                  Newest
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    sortBy !== "most_likes" ? useDispatch(changeSortBy("most_likes")) : null;
                  }}
                  className={classNames(
                    active ? 'bg-gray-800 text-gray-300' : 'text-gray-300',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                >
                  Most Likes
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => {
                    sortBy !== "yours" ? useDispatch(changeSortBy("yours")) : null;
                  }}
                  className={classNames(
                    active ? 'bg-gray-800 text-gray-300' : 'text-gray-300',
                    'block px-4 py-2 text-sm cursor-pointer'
                  )}
                >
                  Your Posts
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
